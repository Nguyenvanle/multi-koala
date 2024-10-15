package com.duokoala.server.dto.response.favouriteResponse;

import com.duokoala.server.dto.response.courseResponse.CourseResponse;
import com.duokoala.server.dto.response.userResponse.StudentResponse;
import com.duokoala.server.entity.Course;
import com.duokoala.server.entity.user.Student;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FavouriteResponse {
    String favouriteId;
    LocalDateTime favouriteAt;
    StudentResponse student;
    CourseResponse course;
}
