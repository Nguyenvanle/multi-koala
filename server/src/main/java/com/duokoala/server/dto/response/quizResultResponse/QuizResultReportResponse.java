package com.duokoala.server.dto.response.quizResultResponse;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class QuizResultReportResponse {
     String studentId;
     String studentName;
     String courseId;
     String courseName;
     String lessonId;
     String lessonName;
     String testId;
     String testName;
     String correct;
     String score;
     LocalDateTime dateTaken;
}
