package com.duokoala.server.service;

import com.duokoala.server.dto.request.discountCourseRequest.DiscountCourseApproveRequest;
import com.duokoala.server.dto.request.discountCourseRequest.DiscountCourseCreateRequest;
import com.duokoala.server.dto.response.discountCourseResponse.DiscountCourseResponse;
import com.duokoala.server.dto.response.discountCourseResponse.DiscountOnlyResponse;
import com.duokoala.server.entity.Course;
import com.duokoala.server.entity.Discount;
import com.duokoala.server.entity.DiscountCourse;
import com.duokoala.server.enums.Status;
import com.duokoala.server.exception.AppException;
import com.duokoala.server.exception.ErrorCode;
import com.duokoala.server.mapper.DiscountCourseMapper;
import com.duokoala.server.repository.CourseRepository;
import com.duokoala.server.repository.DiscountCourseRepository;
import com.duokoala.server.repository.DiscountRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DiscountCourseService {
    DiscountCourseRepository discountCourseRepository;
    DiscountCourseMapper discountCourseMapper;
    DiscountRepository discountRepository;
    CourseRepository courseRepository;

    public DiscountCourseResponse create(DiscountCourseCreateRequest request) {
        Discount discount = discountRepository.findById(request.getDiscountId())
                .orElseThrow(() -> new AppException(ErrorCode.DISCOUNT_NOT_FOUND));
        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND));
        DiscountCourse discountCourse = DiscountCourse.builder()
                .discount(discount)
                .course(course)
                .status(Status.PENDING_APPROVAL)
                .build();
        try {
            discountCourseRepository.save(discountCourse);
        } catch (DataIntegrityViolationException e) {
            throw new AppException(ErrorCode.DISCOUNT_COURSE_EXISTED);
        }
        return discountCourseMapper.toDiscountCourseResponse(discountCourse);
    }

    public DiscountCourseResponse approve(String discountCourseId, DiscountCourseApproveRequest request) {
        Status approvedStatus = Status.validateApprovedStatus(request.getStatus());
        var discountCourse = discountCourseRepository.findById(discountCourseId)
                .orElseThrow(() -> new AppException(ErrorCode.DISCOUNT_COURSE_NOT_FOUND));

        if(!discountCourse.getStatus().equals(Status.PENDING_APPROVAL))
            throw new AppException(ErrorCode.DISCOUNT_COURSE_ALREADY_APPROVED);

        discountCourse.setStatus(approvedStatus);
        return discountCourseMapper.toDiscountCourseResponse(
                discountCourseRepository.save(discountCourse));
    }

    public DiscountCourseResponse get(String discountCourseId) {
        return discountCourseMapper.toDiscountCourseResponse(
                discountCourseRepository.findById(discountCourseId)
                        .orElseThrow(()-> new AppException(ErrorCode.DISCOUNT_COURSE_NOT_FOUND)));

    }

    public List<DiscountCourseResponse> getAll() {
        var discountCourses = discountCourseRepository.findAll();
        return discountCourses.stream().map(discountCourseMapper::toDiscountCourseResponse).toList();
    }

    public List<DiscountOnlyResponse> getListByCourseId(String courseId) {
        var discountCourses = discountCourseRepository.getListByCourseId(courseId);
        return discountCourses.stream().map(discountCourseMapper::toDiscountOnlyResponse).toList();
    }

    public void delete(String discountCourseId) {
        discountCourseRepository.deleteById(discountCourseId);
    }
}
