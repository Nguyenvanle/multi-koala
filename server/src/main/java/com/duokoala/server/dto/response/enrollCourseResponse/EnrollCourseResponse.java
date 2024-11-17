package com.duokoala.server.dto.response.enrollCourseResponse;

import com.duokoala.server.dto.response.courseResponse.CourseResponse;
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
    boolean isSuggest;
    StudentResponse student;
    CourseResponse course;
}
