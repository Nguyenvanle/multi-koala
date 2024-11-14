package com.duokoala.server.dto.response.analysis.studentAnalysisResponse;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StudentReportAnalysisResponse {
    LocalDateTime month;
    float trend;
    List<AnalysisStudentStatusResponse> studentStatus;
}
