package com.duokoala.server.dto.response.analysis.studentAnalysisResponse;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AnalysisStudentStatusResponse {
    String status;
    int numberOfStudents;
    String description;
}
