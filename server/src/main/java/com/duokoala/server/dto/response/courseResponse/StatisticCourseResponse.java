package com.duokoala.server.dto.response.courseResponse;

import com.duokoala.server.enums.Status;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StatisticCourseResponse {
    String courseId;
    String courseName;
    Status status;
    int totalEnrollments;
    int totalCompleted;
    double income;
}
