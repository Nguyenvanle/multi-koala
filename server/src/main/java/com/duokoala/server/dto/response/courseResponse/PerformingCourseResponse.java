package com.duokoala.server.dto.response.courseResponse;

import com.duokoala.server.dto.response.mediaResponse.ImageResponse;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PerformingCourseResponse {
    String courseId;
    String courseName;
    ImageResponse image;
    float AVGCourseRating;
    int numberOfReviews;
    double income;
    boolean isDeleted;
}
