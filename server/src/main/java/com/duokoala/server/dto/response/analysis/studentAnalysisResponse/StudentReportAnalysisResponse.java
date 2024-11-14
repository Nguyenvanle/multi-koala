package com.duokoala.server.dto.response.analysis.studentAnalysisResponse;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StudentReportAnalysisResponse {
    LocalDateTime month;
    float trend;
    List<AnalysisStudentStatusResponse> studentStatus;
}
