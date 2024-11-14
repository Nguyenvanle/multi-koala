package com.duokoala.server.service;

import com.duokoala.server.dto.response.analysis.studentAnalysisResponse.StudentReportAnalysisResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AnalysisService {
    public StudentReportAnalysisResponse getStudentReportAnalysis() {
        return StudentReportAnalysisResponse.builder()
                .month(LocalDateTime.now())
                .trend(0)
                .studentStatus(null)
                .build();
    }
}
