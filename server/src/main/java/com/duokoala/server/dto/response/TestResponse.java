package com.duokoala.server.dto.response;

import com.duokoala.server.entity.Lesson;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TestResponse {
    String testId;
    String testDescription;
    Lesson lesson;
    boolean isDeleted;
}
