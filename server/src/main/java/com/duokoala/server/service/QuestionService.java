package com.duokoala.server.service;

import com.duokoala.server.dto.request.questionRequest.QuestionCreateRequest;
import com.duokoala.server.dto.request.questionRequest.QuestionSubmitRequest;
import com.duokoala.server.dto.request.questionRequest.QuestionUpdateRequest;
import com.duokoala.server.dto.response.answerResponse.AnswerSubmitResponse;
import com.duokoala.server.dto.response.questionResponse.QuestionResponse;
import com.duokoala.server.dto.response.questionResponse.QuestionSubmitResponse;
import com.duokoala.server.entity.Answer;
import com.duokoala.server.entity.Question;
import com.duokoala.server.exception.AppException;
import com.duokoala.server.exception.ErrorCode;
import com.duokoala.server.mapper.QuestionMapper;
import com.duokoala.server.repository.AnswerRepository;
import com.duokoala.server.repository.QuestionRepository;
import com.duokoala.server.repository.TestRepository;
import com.duokoala.server.service.mediaService.CloudinaryService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class QuestionService {
    private final AnswerRepository answerRepository;
    QuestionRepository questionRepository;
    QuestionMapper questionMapper;
    TestRepository testRepository;
    CloudinaryService cloudinaryService;

    @Transactional
    public QuestionSubmitResponse convertToSubmitResponse(QuestionSubmitRequest request) {
        var question = questionRepository.findById(request.getQuestionId())
                .orElseThrow(() -> new AppException(ErrorCode.QUESTION_NOT_FOUND));

        // Giữ nguyên giá trị selectedAnswer như trước nhưng chỉ gán khi cần
        Answer selectedAnswer = null;

        if (request.getSelectedAnswerId() != null) {
            selectedAnswer = answerRepository.findById(request.getSelectedAnswerId())
                    .orElseThrow(() -> new AppException(ErrorCode.ANSWER_NOT_FOUND));
            if (!selectedAnswer.getQuestion().equals(question)) {
                throw new AppException(ErrorCode.ANSWER_DOES_NOT_BELONG_TO_QUESTION);
            }
        }

        var answerList = question.getAnswers();
        Answer finalSelectedAnswer = selectedAnswer;
        List<AnswerSubmitResponse> answerSubmitResponses = answerList
                .stream().map(answer -> {
                    AnswerSubmitResponse responseAnswer = questionMapper.toAnswerSubmitResponse(answer);

                    // Chỉ định nếu đáp án này là đáp án đã chọn
                    if (finalSelectedAnswer != null) {
                        responseAnswer.setSelected(finalSelectedAnswer.getAnswerId().equals(answer.getAnswerId()));
                    } else {
                        responseAnswer.setSelected(false);
                    }
                    return responseAnswer;
                }).toList();

        var questionSubmitResponse = questionMapper.toQuestionSubmitResponse(question);
        questionSubmitResponse.setAnswers(answerSubmitResponses);
        return questionSubmitResponse;
    }

    @Transactional
    public QuestionResponse create(String testId, QuestionCreateRequest request) {
        Question question = questionMapper.toQuestion(request);
        question.setTest(testRepository.findById(testId)
                .orElseThrow(() -> new AppException(ErrorCode.TEST_NOT_FOUND)));
        question.setActive(true);
        question = questionRepository.save(question);
        List<Answer> answers = new ArrayList<>();
        int indexAnswer = 0;
        for (String answerDescription : request.getAnswers()) {
            Answer answer = Answer.builder()
                    .answerDescription(answerDescription)
                    .question(question)
                    .build();
            answer.setCorrect(indexAnswer == request.getCorrectIndex());
            answers.add(answer);
            indexAnswer++;
        }
        question.setAnswers(answers);
        return questionMapper.toQuestionResponse(questionRepository.save(question));
    }

    @Transactional//create new quest and disable old question
    public QuestionResponse update(String questionId, QuestionUpdateRequest request) {
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new AppException(ErrorCode.QUESTION_NOT_FOUND));
        question.setActive(false);
        questionRepository.save(question);
        return create(question.getTest().getTestId(),
                questionMapper.toQuestionCreateRequest(request));
    }

    @Transactional
    public QuestionResponse uploadImage(String questionId, MultipartFile imageFile) throws IOException {
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new AppException(ErrorCode.QUESTION_NOT_FOUND));
        if (question.getImage() != null) cloudinaryService.deleteImage(question.getImage().getImageId());
        question.setImage(cloudinaryService.uploadImage(imageFile));
        return questionMapper.toQuestionResponse(questionRepository.save(question));
    }

    public QuestionResponse get(String questionId) {
        return questionMapper.toQuestionResponse(questionRepository.findById(questionId)
                .orElseThrow(() -> new AppException(ErrorCode.QUESTION_NOT_FOUND)));
    }

    public List<QuestionResponse> getAll() {
        var questions = questionRepository.findAll();
        return questions.stream()
                .map(questionMapper::toQuestionResponse).toList();
    }

    public void delete(String questionId) {
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new AppException(ErrorCode.QUESTION_NOT_FOUND));
        question.setActive(false);
        questionRepository.save(question);
    }
}
