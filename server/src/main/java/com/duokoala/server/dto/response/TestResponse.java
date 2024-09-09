package com.duokoala.server.dto.response;

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
public class TestResponse {
    String testId;
    String testDescription;
    LessonResponse lesson;
    LocalDateTime TestUploadedAt;
    boolean isDeleted;
}
