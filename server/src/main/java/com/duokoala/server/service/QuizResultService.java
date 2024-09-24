package com.duokoala.server.service;

import com.duokoala.server.dto.request.quizResultRequest.QuizResultCreateRequest;
import com.duokoala.server.dto.request.quizResultRequest.QuizResultSubmitRequest;
import com.duokoala.server.dto.response.QuizResultResponse;
import com.duokoala.server.entity.QuizResult;
import com.duokoala.server.exception.AppException;
import com.duokoala.server.exception.ErrorCode;
import com.duokoala.server.mapper.QuizResultMapper;
import com.duokoala.server.repository.AnswerRepository;
import com.duokoala.server.repository.QuestionRepository;
import com.duokoala.server.repository.QuizResultRepository;
import com.duokoala.server.repository.TestRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class QuizResultService {
    QuizResultRepository quizResultRepository;
    QuizResultMapper quizResultMapper;
    TestRepository testRepository;
    QuestionRepository questionRepository;
    AuthenticationService authenticationService;
    private final AnswerRepository answerRepository;

    public QuizResultResponse submitQuiz(String testId, QuizResultSubmitRequest request) {
        var test = testRepository.findById(testId)
                .orElseThrow(() -> new AppException(ErrorCode.TEST_NOT_FOUND));
        var questionList  = request.getAnswerSubmitList();
        int totalQuestion = questionList.size();
        int answeredQuestion = (int) questionList
                .stream()
                .filter(question -> question.getSelectedAnswerId() != null)
                .count();
        int correctAnswers = (int) questionList
                .stream()
                .filter(question -> {
                    var answerId = question.getSelectedAnswerId();
                    var answer = answerRepository.findById(answerId)
                            .orElseThrow(() -> new AppException(ErrorCode.ANSWER_NOT_FOUND));
                    return answer.isCorrect();
                }).count();

        QuizResultResponse quizResultResponse = quizResultMapper
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
