package com.duokoala.server.dto.response;

import com.duokoala.server.dto.response.questionResponse.QuestionResponse;
import com.duokoala.server.enums.Status;
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
public class TestResponse {
    String testId;
    String testDescription;
//    LessonResponse lesson;
    LocalDateTime TestUploadedAt;
    int passingScore;
    Status status;
    boolean isDeleted;
    List<QuestionResponse> questions;
}
