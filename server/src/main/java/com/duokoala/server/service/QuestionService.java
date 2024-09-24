package com.duokoala.server.service;

import com.duokoala.server.dto.request.questionRequest.QuestionCreateRequest;
import com.duokoala.server.dto.request.questionRequest.QuestionSubmitRequest;
import com.duokoala.server.dto.request.questionRequest.QuestionUpdateRequest;
import com.duokoala.server.dto.response.answerResponse.AnswerSubmitResponse;
import com.duokoala.server.dto.response.questionResponse.QuestionResponse;
import com.duokoala.server.dto.response.questionResponse.QuestionSubmitResponse;
import com.duokoala.server.entity.Answer;
import com.duokoala.server.entity.Question;
import com.duokoala.server.entity.media.Image;
import com.duokoala.server.exception.AppException;
import com.duokoala.server.exception.ErrorCode;
import com.duokoala.server.mapper.QuestionMapper;
import com.duokoala.server.repository.QuestionRepository;
import com.duokoala.server.repository.TestRepository;
import com.duokoala.server.repository.mediaRepository.ImageRepository;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class QuestionService {
    private final ImageRepository imageRepository;
    QuestionRepository questionRepository;
    QuestionMapper questionMapper;
    TestRepository testRepository;

    public QuestionSubmitResponse convertToSubmitResponse(QuestionSubmitRequest request) {
        var question = questionRepository.findById(request.getQuestionId())
                .orElseThrow(() -> new AppException(ErrorCode.QUESTION_NOT_FOUND));
        var answerList = question.getAnswers();
        List<AnswerSubmitResponse> answerSubmitResponses = answerList
                .stream().map(answer -> {
                    AnswerSubmitResponse responseAnswer = questionMapper.toAnswerSubmitResponse(answer);
                    responseAnswer.setSelected(request.getSelectedAnswerId().equals(answer.getAnswerId()));
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
        Image image = new Image();
        image.setImageUrl(request.getImageUrl());
        question.setImage(image);
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

    public QuestionResponse update(String questionId, QuestionUpdateRequest request) {
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new AppException(ErrorCode.QUESTION_NOT_FOUND));
        questionMapper.updateQuestion(question, request);
        List<Answer> answers = question.getAnswers();
        answers.clear();
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
        question.getImage().setImageUrl(request.getImageUrl());
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
        questionRepository.deleteById(questionId);
    }
}
