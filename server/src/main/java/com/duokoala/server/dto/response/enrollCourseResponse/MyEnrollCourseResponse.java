package com.duokoala.server.dto.response.enrollCourseResponse;
import com.duokoala.server.dto.response.CourseResponse;
import com.duokoala.server.dto.response.userResponse.StudentResponse;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MyEnrollCourseResponse {
    String enrollCourseId;
    LocalDateTime enrollAt;
    float process;
    CourseResponse course;
}
