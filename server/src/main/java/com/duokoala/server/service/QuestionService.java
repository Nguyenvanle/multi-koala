package com.duokoala.server.service;

import ch.qos.logback.core.spi.ErrorCodes;
import com.duokoala.server.dto.request.questionRequest.QuestionCreateRequest;
import com.duokoala.server.dto.request.questionRequest.QuestionUpdateRequest;
import com.duokoala.server.dto.response.QuestionResponse;
import com.duokoala.server.entity.Answer;
import com.duokoala.server.entity.Question;
import com.duokoala.server.exception.AppException;
import com.duokoala.server.exception.ErrorCode;
import com.duokoala.server.mapper.QuestionMapper;
import com.duokoala.server.repository.QuestionRepository;
import com.duokoala.server.repository.TestRepository;
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
    QuestionRepository questionRepository;
    QuestionMapper questionMapper;
    TestRepository testRepository;

    @Transactional
    public QuestionResponse create(String testId, QuestionCreateRequest request) {
        Question question = questionMapper.toQuestion(request);
        question.setTest(testRepository.findById(testId)
                .orElseThrow(() -> new AppException(ErrorCode.TEST_NOT_FOUND)));
        question = questionRepository.save(question);
        List<Answer> answers = new ArrayList<>();
        int indexAnswer = 1;
        for(String answerDescription: request.getAnswers()) {
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
        questionMapper.updateQuestion(question,request);
        List<Answer> answers = question.getAnswers();
        answers.clear();
        int indexAnswer = 1;
        for(String answerDescription: request.getAnswers()) {
            Answer answer = Answer.builder()
                    .answerDescription(answerDescription)
                    .question(question)
                    .build();
            answer.setCorrect(indexAnswer == request.getCorrectIndex());
            answers.add(answer);
            indexAnswer++;
        }
        return questionMapper.toQuestionResponse(questionRepository.save(question));
    }

    public QuestionResponse get(String questionId) {
        return questionMapper.toQuestionResponse(questionRepository.findById(questionId)
                .orElseThrow(() -> new AppException(ErrorCode.QUESTION_NOT_FOUND)));
    }

    public List<QuestionResponse> getAll() {
        var questions = questionRepository.findAll();
        return questions.stream().map(questionMapper::toQuestionResponse).toList();
    }

    public void delete(String questionId) {
        questionRepository.deleteById(questionId);
    }
}
