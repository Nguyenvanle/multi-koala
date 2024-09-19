package com.duokoala.server.service;

import com.duokoala.server.dto.request.reviewRequest.ReviewCreateRequest;
import com.duokoala.server.dto.request.reviewRequest.ReviewUpdateRequest;
import com.duokoala.server.dto.response.ReviewResponse;
import com.duokoala.server.entity.Review;
import com.duokoala.server.exception.AppException;
import com.duokoala.server.exception.ErrorCode;
import com.duokoala.server.mapper.ReviewMapper;
import com.duokoala.server.repository.CourseRepository;
import com.duokoala.server.repository.ReviewRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ReviewService {
    CourseRepository courseRepository;
    AuthenticationService authenticationService;
    ReviewRepository reviewRepository;
    ReviewMapper reviewMapper;

    public float getAvgRatingTeacher(String teacherId) {
        Float avgRating = reviewRepository.getAvgTeacher(teacherId);
        return avgRating != null ? avgRating : 0.0f;
    }

    float getAvgRatingCourse(String courseId) {
        Float avgCourse = reviewRepository.getAvgCourse(courseId);
        return avgCourse != null ? avgCourse : 0.0f;
    }

    public ReviewResponse create(String courseId, ReviewCreateRequest request) {
        Review review = reviewMapper.toReview(request);
        var course = courseRepository.findById(courseId)
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND));
        var student = authenticationService.getAuthenticatedStudent();
        review.setStudent(student);
        review.setCourse(course);
        review.setReviewAt(LocalDateTime.now());

        try {
            reviewRepository.save(review);
        } catch (DataIntegrityViolationException e) {
            throw new AppException(ErrorCode.REVIEW_EXISTED);
        }
        return reviewMapper.toReviewResponse(review);
    }

    public ReviewResponse update(String reviewId, ReviewUpdateRequest request) {
        var review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new AppException(ErrorCode.REVIEW_NOT_FOUND));
        reviewMapper.updateReview(review, request);
        review.setReviewAt(LocalDateTime.now());
        return reviewMapper.toReviewResponse(reviewRepository.save(review));
    }

    public ReviewResponse get(String reviewId) {
        return reviewMapper.toReviewResponse(reviewRepository.findById(reviewId)
                .orElseThrow(() -> new AppException(ErrorCode.REVIEW_NOT_FOUND)));
    }

    public List<ReviewResponse> getAll() {
        var reviews = reviewRepository.findAll();
        return reviews.stream().map(reviewMapper::toReviewResponse).toList();
    }

    public void delete(String reviewId) {
        reviewRepository.deleteById(reviewId);
    }

}
