package com.duokoala.server.dto.response.courseResponse;

import com.duokoala.server.dto.response.mediaResponse.ImageResponse;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PerformingCourseResponse {
    String courseId;
    String courseName;
    ImageResponse image;
    float AVGCourseRating;
    int numberOfReviews;
    int numberOfEnrollments;
    double income;
    boolean isDeleted;
}
