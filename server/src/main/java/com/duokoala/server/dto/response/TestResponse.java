package com.duokoala.server.dto.response;

import com.duokoala.server.entity.Question;
import com.duokoala.server.enums.Status;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
    Status status;
    boolean isDeleted;
    List<Question> questions;
}
