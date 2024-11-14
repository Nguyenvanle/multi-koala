package com.duokoala.server.dto.response.analysis.courseAnalysisResponse;

import com.duokoala.server.dto.response.mediaResponse.ImageResponse;
import com.duokoala.server.enums.courseEnums.Status;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StatisticCourseResponse {
    String courseId;
    String courseName;
    float coursePrice;
    LocalDateTime courseUploadedAt;
    ImageResponse image;
    Status status;
    int totalEnrollments;
    int totalCompleted;
    double income;
}
