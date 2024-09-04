package com.duokoala.server.service;

import com.duokoala.server.dto.request.testRequest.TestCreateRequest;
import com.duokoala.server.dto.request.testRequest.TestUpdateRequest;
import com.duokoala.server.dto.response.TestResponse;
import com.duokoala.server.entity.Test;
import com.duokoala.server.exception.AppException;
import com.duokoala.server.exception.ErrorCode;
import com.duokoala.server.mapper.TestMapper;
import com.duokoala.server.repository.LessonRepository;
import com.duokoala.server.repository.TestRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

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

    public TestResponse get(String testId) {
        return testMapper.toTestResponse(testRepository.findById(testId)
                .orElseThrow(() -> new AppException(ErrorCode.TEST_NOT_FOUND)));
    }

    public List<TestResponse> getAll() {
        var tests = testRepository.findAll();
        return tests.stream().map(testMapper::toTestResponse).toList();
    }

    public void delete(String testId) {
        var test = testRepository.findById(testId)
                .orElseThrow(() -> new AppException(ErrorCode.TEST_NOT_FOUND));
        test.setDeleted(true);
        testRepository.save(test);
    }
}
