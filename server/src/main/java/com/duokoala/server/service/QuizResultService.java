package com.duokoala.server.service;

import com.duokoala.server.dto.request.questionRequest.QuestionSubmitRequest;
import com.duokoala.server.dto.request.quizResultRequest.QuizResultCreateRequest;
import com.duokoala.server.dto.request.quizResultRequest.QuizResultSubmitRequest;
import com.duokoala.server.dto.response.quizResultResponse.QuizResultReportResponse;
import com.duokoala.server.dto.response.quizResultResponse.QuizResultResponse;
import com.duokoala.server.dto.response.questionResponse.QuestionSubmitResponse;
import com.duokoala.server.entity.*;
import com.duokoala.server.exception.AppException;
import com.duokoala.server.exception.ErrorCode;
import com.duokoala.server.mapper.QuizResultMapper;
import com.duokoala.server.repository.*;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
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
        if (question.getSelectedAnswerId() == null) return false;
        return answerRepository.findById(question.getSelectedAnswerId())
                .map(Answer::isCorrect)
                .orElseThrow(() -> new AppException(ErrorCode.ANSWER_NOT_FOUND));
    }

    private List<StudentAnswer> createStudentAnswers(QuizResult quizResult, List<QuestionSubmitRequest> questionList) {
        return questionList.stream().map(questionAnswer -> createStudentAnswer(quizResult, questionAnswer)).toList();
    }

    private StudentAnswer createStudentAnswer(QuizResult quizResult, QuestionSubmitRequest questionAnswer) {
        Question question = questionRepository.findById(questionAnswer.getQuestionId())
                .orElseThrow(() -> new AppException(ErrorCode.QUESTION_NOT_FOUND));
        Answer answer = null;
        boolean isCorrect = false;
        if (questionAnswer.getSelectedAnswerId() != null) {
            answer = answerRepository.findById(questionAnswer.getSelectedAnswerId())
                    .orElseThrow(() -> new AppException(ErrorCode.ANSWER_NOT_FOUND));
            isCorrect = answer.isCorrect();
        }
        return StudentAnswer.builder()
                .quizResult(quizResult)
                .question(question)
                .selectedAnswer(answer)
                .isCorrect(isCorrect)
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

    public QuizResultResponse getQuizResultResponse(String quizResultId) {
        QuizResult quizResult = quizResultRepository.findById(quizResultId)
                .orElseThrow(() -> new AppException(ErrorCode.QUIZ_RESULT_NOT_FOUND));
        List<QuestionSubmitResponse> questionSubmitResponses = studentAnswerRepository
                .findAllByQuizResult(quizResult)
                .stream()
                .map(studentAnswer -> questionService.convertToSubmitResponse(QuestionSubmitRequest.builder()
                        .questionId(studentAnswer.getQuestion().getQuestionId())
                        .selectedAnswerId(studentAnswer.getSelectedAnswer() != null ? studentAnswer.getSelectedAnswer().getAnswerId() : null)
                        .build())
                )
                .toList();
        return createQuizResultResponse(quizResult, questionSubmitResponses);
    }

    public List<QuizResultResponse> getMine() {
        List<QuizResult> quizResults = quizResultRepository.findAllByStudent(authenticationService.getAuthenticatedStudent());
        return quizResults
                .stream()
                .map(quizResult ->
                        getQuizResultResponse(quizResult.getQuizResultId()))
                .toList();
    }

    public List<QuizResultResponse> getMineFromTest(String testId) {
        Test test = testRepository.findById(testId)
                .orElseThrow(() -> new AppException(ErrorCode.TEST_NOT_FOUND));
        List<QuizResult> quizResults = quizResultRepository
                .findAllByStudentAndTestOrderByDateTakenDesc(authenticationService.getAuthenticatedStudent(), test);
        return quizResults
                .stream()
                .map(quizResult ->
                        getQuizResultResponse(quizResult.getQuizResultId()))
                .toList();
    }

    public List<QuizResultResponse> getAll() {
        var quizResults = quizResultRepository.findAll();
        return quizResults.stream().map(quizResultMapper::toQuizResultResponse).toList();
    }

    public void delete(String quizResultId) {
        quizResultRepository.deleteById(quizResultId);
    }

    public List<QuizResultReportResponse> getMyQuizResultReport() {
        String teacherId = authenticationService.getAuthenticatedTeacher().getUserId();
        List<QuizResult> quizResults = quizResultRepository.findAllWithDetails(teacherId);
        return quizResults.stream().map(qr -> {
            QuizResultReportResponse.QuizResultReportResponseBuilder reportBuilder = QuizResultReportResponse.builder();
            reportBuilder.studentId(qr.getStudent().getUserId());
            reportBuilder.studentName(qr.getStudent().getFirstname() + " " + qr.getStudent().getLastname());
            reportBuilder.courseId(qr.getTest().getLesson().getCourse().getCourseId());
            reportBuilder.courseName(qr.getTest().getLesson().getCourse().getCourseName());
            reportBuilder.lessonId(qr.getTest().getLesson().getLessonId());
            reportBuilder.lessonName(qr.getTest().getLesson().getLessonName());
            reportBuilder.testId(qr.getTest().getTestId());
            reportBuilder.testName(qr.getTest().getTestDescription());
            reportBuilder.correct(qr.getCorrectAnswers() + "/" + qr.getTotalQuestion());
            reportBuilder.score(qr.getTotalQuestion() == 0 ? "0" : String.format("%.2f%%", (1.0 * qr.getCorrectAnswers() / qr.getTotalQuestion() * 100)));
            reportBuilder.dateTaken(qr.getDateTaken());
            return reportBuilder.build();
        }).toList();
    }
}
