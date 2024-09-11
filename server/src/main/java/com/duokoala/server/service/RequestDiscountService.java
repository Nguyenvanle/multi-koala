package com.duokoala.server.service;

import com.duokoala.server.dto.request.requestDiscountRequest.RequestDiscountApproveRequest;
import com.duokoala.server.dto.request.requestDiscountRequest.RequestDiscountCreateRequest;
import com.duokoala.server.dto.request.requestDiscountRequest.RequestDiscountUpdateRequest;
import com.duokoala.server.dto.response.requestDiscountResponse.RequestDiscountOnlyResponse;
import com.duokoala.server.dto.response.requestDiscountResponse.RequestDiscountResponse;
import com.duokoala.server.entity.RequestDiscount;
import com.duokoala.server.enums.Status;
import com.duokoala.server.exception.AppException;
import com.duokoala.server.exception.ErrorCode;
import com.duokoala.server.mapper.RequestDiscountMapper;
import com.duokoala.server.repository.CourseRepository;
import com.duokoala.server.repository.RequestDiscountRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RequestDiscountService {
    RequestDiscountRepository requestDiscountRepository;
    RequestDiscountMapper requestDiscountMapper;
    CourseRepository courseRepository;
    AuthenticationService authenticationService;

    public RequestDiscountResponse create(
            String courseId,
            RequestDiscountCreateRequest request) {
        RequestDiscount requestDiscount = requestDiscountMapper.toRequestDiscount(request);
        var course = courseRepository.findById(courseId)
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND));
        requestDiscount.setCourse(course);
        requestDiscount.setSubmittedByTeacher(authenticationService.getAuthenticatedTeacher());
        requestDiscount.setStatus(Status.PENDING_APPROVAL);
        return requestDiscountMapper
                .toRequestDiscountResponse(requestDiscountRepository.save(requestDiscount));
    }

    public RequestDiscountResponse update(
            String requestDiscountId,
            RequestDiscountUpdateRequest request) {
        RequestDiscount requestDiscount = requestDiscountRepository.findById(requestDiscountId)
                .orElseThrow(() -> new AppException(ErrorCode.REQUEST_DISCOUNT_NOT_FOUND));
        requestDiscountMapper.updateRequestDiscount(requestDiscount,request);
        return requestDiscountMapper.toRequestDiscountResponse(requestDiscountRepository.save(requestDiscount));
    }

    public RequestDiscountResponse approve(
            String requestDiscountId,
            RequestDiscountApproveRequest request) {
        Status approvedStatus = Status.validateApprovedStatus(request.getStatus());
        RequestDiscount requestDiscount = requestDiscountRepository.findById(requestDiscountId)
                .orElseThrow(() -> new AppException(ErrorCode.REQUEST_DISCOUNT_NOT_FOUND));
        if(!requestDiscount.getStatus().equals(Status.PENDING_APPROVAL))
            throw new AppException(ErrorCode.DISCOUNT_COURSE_ALREADY_APPROVED);
        requestDiscount.setStatus(approvedStatus);
        requestDiscount.setApprovedByAdmin(authenticationService.getAuthenticatedAdmin());
        return requestDiscountMapper.toRequestDiscountResponse(requestDiscountRepository.save(requestDiscount));
    }

    public RequestDiscountResponse get(String requestDiscountId) {
        return requestDiscountMapper.toRequestDiscountResponse(
                requestDiscountRepository.findById(requestDiscountId)
                        .orElseThrow(() -> new AppException(ErrorCode.REQUEST_DISCOUNT_NOT_FOUND)));
    }

    public List<RequestDiscountResponse> getAll() {
        var requestDiscounts = requestDiscountRepository.findAll();
        return requestDiscounts.stream().map(requestDiscountMapper::toRequestDiscountResponse).toList();
    }

    public List<RequestDiscountOnlyResponse> getAllByCourse(String courseId) {
        var course = courseRepository.findById(courseId)
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND));
        var requestDiscounts = requestDiscountRepository.findAllByCourse(course);
        return requestDiscounts.stream().map(requestDiscountMapper::toRequestDiscountOnlyResponse).toList();
    }

    public void delete(String requestDiscountId) {
        requestDiscountRepository.deleteById(requestDiscountId);
    }

}
