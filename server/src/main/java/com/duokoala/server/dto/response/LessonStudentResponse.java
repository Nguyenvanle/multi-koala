package com.duokoala.server.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class LessonStudentResponse {
    String lessonStudentId;
    float process;
    LocalDateTime lastUpdate;
    LessonResponse lesson;
}
