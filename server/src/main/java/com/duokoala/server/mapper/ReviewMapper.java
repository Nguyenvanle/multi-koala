package com.duokoala.server.mapper;


import com.duokoala.server.dto.request.reviewRequest.ReviewCreateRequest;
import com.duokoala.server.dto.request.reviewRequest.ReviewUpdateRequest;
import com.duokoala.server.dto.response.reviewResponse.ReviewResponse;
import com.duokoala.server.entity.Review;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper( componentModel = "spring")// used in spring
public interface ReviewMapper {
    Review toReview(ReviewCreateRequest request);
    ReviewResponse toReviewResponse(Review review);
    void updateReview(@MappingTarget Review review, ReviewUpdateRequest request);
}
