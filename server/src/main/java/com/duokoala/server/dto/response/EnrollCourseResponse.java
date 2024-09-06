package com.duokoala.server.dto.response;
import com.duokoala.server.dto.response.userResponse.StudentResponse;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class EnrollCourseResponse {
    String enrollCourseId;
    LocalDateTime enrollAt;
    float process;
    StudentResponse student;
    CourseResponse course;
}