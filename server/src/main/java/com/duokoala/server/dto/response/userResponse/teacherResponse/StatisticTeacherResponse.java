package com.duokoala.server.dto.response.userResponse.teacherResponse;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StatisticTeacherResponse {
    int totalCourses;
    int totalApprovedCourses;
    int totalEnrollments;
    int totalStudents;
    int totalCompletedCourses;
    double totalPrices;
    double passRatingPerTest;
    double correctRatingPerQuestion;
}
