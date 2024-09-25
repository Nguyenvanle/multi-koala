package com.duokoala.server.service;

import com.duokoala.server.dto.request.questionRequest.QuestionSubmitRequest;
import com.duokoala.server.dto.request.quizResultRequest.QuizResultCreateRequest;
import com.duokoala.server.dto.request.quizResultRequest.QuizResultSubmitRequest;
import com.duokoala.server.dto.response.QuizResultResponse;
import com.duokoala.server.dto.response.questionResponse.QuestionSubmitResponse;
import com.duokoala.server.entity.*;
import com.duokoala.server.exception.AppException;
import com.duokoala.server.exception.ErrorCode;
import com.duokoala.server.mapper.QuizResultMapper;
import com.duokoala.server.repository.*;
import com.duokoala.server.repository.userRepository.StudentRepository;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class QuizResultService {
    QuizResultRepository quizResultRepository;
    QuizResultMapper quizResultMapper;
    TestRepository testRepository;
    QuestionRepository questionRepository;
    AuthenticationService authenticationService;
    AnswerRepository answerRepository;
    QuestionService questionService;
    StudentAnswerRepository studentAnswerRepository;

    @Transactional
    public QuizResultResponse submitQuiz(String testId, QuizResultSubmitRequest request) {
        Test test = testRepository.findById(testId).orElseThrow(() -> new AppException(ErrorCode.TEST_NOT_FOUND));
        List<QuestionSubmitRequest> questionList = request.getAnswerSubmitList();
        QuizResult quizResult = createQuizResult(test, questionList);
        List<StudentAnswer> studentAnswers = createStudentAnswers(quizResult, questionList);
        saveQuizResultAndAnswers(quizResult, studentAnswers);
        List<QuestionSubmitResponse> questionResponses = createQuestionResponses(questionList);
        return createQuizResultResponse(quizResult, questionResponses);
    }

    private QuizResult createQuizResult(Test test, List<QuestionSubmitRequest> questionList) {
        int totalQuestion = questionList.size();
        int answeredQuestion = countAnsweredQuestions(questionList);
        int correctAnswers = countCorrectAnswers(questionList);
        QuizResult quizResult = QuizResult.builder()
                .totalQuestion(totalQuestion)
                .answeredQuestions(answeredQuestion)
                .correctAnswers(correctAnswers)
                .test(test)
                .dateTaken(LocalDateTime.now())
                .build();
        try {
            quizResult.setStudent(authenticationService.getAuthenticatedStudent());
        } catch (Exception e) {
            // Handle exception or log it
        }
        return quizResult;
    }

    private int countAnsweredQuestions(List<QuestionSubmitRequest> questionList) {
        return (int) questionList.stream()
                .filter(question -> question.getSelectedAnswerId() != null).count();
    }

    private int countCorrectAnswers(List<QuestionSubmitRequest> questionList) {
        return (int) questionList.stream()
                .filter(this::isCorrectAnswer).count();
    }

    private boolean isCorrectAnswer(QuestionSubmitRequest question) {
        return answerRepository.findById(question.getSelectedAnswerId())
                .map(Answer::isCorrect)
                .orElseThrow(() -> new AppException(ErrorCode.ANSWER_NOT_FOUND));
    }

    private List<StudentAnswer> createStudentAnswers(QuizResult quizResult, List<QuestionSubmitRequest> questionList) {
        return questionList.stream().map(questionAnswer -> createStudentAnswer(quizResult, questionAnswer)).toList();
    }

    private StudentAnswer createStudentAnswer(QuizResult quizResult, QuestionSubmitRequest questionAnswer) {
        Answer answer = answerRepository.findById(questionAnswer.getSelectedAnswerId())
                .orElseThrow(() -> new AppException(ErrorCode.ANSWER_NOT_FOUND));
        Question question = questionRepository.findById(questionAnswer.getQuestionId())
                .orElseThrow(() -> new AppException(ErrorCode.QUESTION_NOT_FOUND));
        return StudentAnswer.builder()
                .quizResult(quizResult)
                .question(question)
                .selectedAnswer(answer)
                .isCorrect(answer.isCorrect())
                .build();
    }

    private void saveQuizResultAndAnswers(QuizResult quizResult, List<StudentAnswer> studentAnswers) {
        if (quizResult.getStudent() != null) {
            quizResultRepository.save(quizResult);
            studentAnswerRepository.saveAll(studentAnswers);
        }
    }

    private List<QuestionSubmitResponse> createQuestionResponses(List<QuestionSubmitRequest> questionList) {
        return questionList.stream().map(questionService::convertToSubmitResponse).toList();
    }

    private QuizResultResponse createQuizResultResponse(QuizResult quizResult, List<QuestionSubmitResponse> questionResponses) {
        QuizResultResponse response = quizResultMapper.toQuizResultResponse(quizResult);
        response.setQuestions(questionResponses);
        return response;
    }

    public QuizResultResponse create(
            String testId,
            QuizResultCreateRequest request) {
        QuizResult quizResult = quizResultMapper.toQuizResult(request);
        quizResult.setTotalQuestion(questionRepository.countQuestionsByTestId(testId));
        quizResult.setDateTaken(LocalDateTime.now());
        quizResult.setStudent(authenticationService.getAuthenticatedStudent());
        quizResult.setTest(testRepository.findById(testId)
                .orElseThrow(() -> new AppException(ErrorCode.TEST_NOT_FOUND)));
        return quizResultMapper.toQuizResultResponse(quizResultRepository.save(quizResult));
    }

    public QuizResultResponse get(String quizResultId) {
        return quizResultMapper
                .toQuizResultResponse(quizResultRepository
                        .findById(quizResultId)
                        .orElseThrow(() -> new AppException(ErrorCode.QUIZ_RESULT_NOT_FOUND)));
    }

    public List<QuizResultResponse> getAll() {
        var quizResults = quizResultRepository.findAll();
        return quizResults.stream().map(quizResultMapper::toQuizResultResponse).toList();
    }

    public void delete(String quizResultId) {
        quizResultRepository.deleteById(quizResultId);
    }
}
