package com.duokoala.server.service;

import com.duokoala.server.dto.request.testRequest.TestCreateRequest;
import com.duokoala.server.dto.request.testRequest.TestUpdateRequest;
import com.duokoala.server.dto.response.TestResponse;
import com.duokoala.server.entity.Answer;
import com.duokoala.server.entity.Question;
import com.duokoala.server.entity.Test;
import com.duokoala.server.enums.courseEnums.Status;
import com.duokoala.server.exception.AppException;
import com.duokoala.server.exception.ErrorCode;
import com.duokoala.server.mapper.TestMapper;
import com.duokoala.server.repository.LessonRepository;
import com.duokoala.server.repository.TestRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TestService {
    TestRepository testRepository;
    LessonRepository lessonRepository;
    TestMapper testMapper;

    public TestResponse create(String lessonId, TestCreateRequest request) {
        Test test = testMapper.toTest(request);
        test.setTestUploadedAt(LocalDateTime.now());
        test.setStatus(Status.IN_EDITING);
        test.setLesson(lessonRepository.findById(lessonId)
                .orElseThrow(() -> new AppException(ErrorCode.LESSON_NOT_FOUND)));
        return testMapper.toTestResponse(testRepository.save(test));
    }

    public TestResponse update(String testId, TestUpdateRequest request) {
        Test test = testRepository.findById(testId)
                .orElseThrow(() -> new AppException(ErrorCode.TEST_NOT_FOUND));
        testMapper.updateTest(test, request);
        return testMapper.toTestResponse(testRepository.save(test));
    }

    public TestResponse Approve(String testId) {
        Test test = testRepository.findById(testId)
                .orElseThrow(() -> new AppException(ErrorCode.TEST_NOT_FOUND));
        test.setStatus(Status.APPROVED);
        return testMapper.toTestResponse(testRepository.save(test));
    }

    public TestResponse getAvailableTest(String testId) {
        var test = testRepository.findById(testId)
                .orElseThrow(() -> new AppException(ErrorCode.TEST_NOT_FOUND));
        test.setQuestions(test.getQuestions().stream()
                .filter(Question::isActive)
                .sorted(Comparator.comparing(Question::getQuestionUploadedAt))
                .peek(question -> question.setAnswers(question.getAnswers().stream()
                        .filter(Answer::isActive)
                        .sorted(Comparator.comparing(Answer::getAnswerUploadedAt))
                        .toList()))
                .toList());
        return testMapper.toTestResponse(test);
    }

    public List<TestResponse> getAll() {
        var tests = testRepository.findAll();
        return tests.stream().map(testMapper::toTestResponse).toList();
    }

    public List<TestResponse> getTestsByLessonId(String lessonId) {
        var lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new AppException(ErrorCode.LESSON_NOT_FOUND));
        var tests = testRepository.findAllByLesson(lesson);
        return tests.stream()
                .filter(test -> !test.isDeleted())
                .sorted(Comparator.comparing(Test::getTestUploadedAt))
                .peek(test -> test.setQuestions(test.getQuestions().stream()
                        .filter(Question::isActive)
                        .sorted(Comparator.comparing(Question::getQuestionUploadedAt))
                        .peek(question -> question.setAnswers(question.getAnswers().stream()
                                .filter(Answer::isActive)
                                .sorted(Comparator.comparing(Answer::getAnswerUploadedAt))
                                .toList()))
                        .toList()))
                .map(testMapper::toTestResponse).toList();
    }

    public void delete(String testId) {
        var test = testRepository.findById(testId)
                .orElseThrow(() -> new AppException(ErrorCode.TEST_NOT_FOUND));
        test.setDeleted(true);
        testRepository.save(test);
    }
}
