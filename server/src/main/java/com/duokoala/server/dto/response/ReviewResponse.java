package com.duokoala.server.dto.response;

import com.duokoala.server.dto.response.userResponse.StudentResponse;
import com.duokoala.server.entity.Course;
import com.duokoala.server.entity.user.Student;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReviewResponse {
    String reviewId;
    float rating;
    String comment;
    LocalDateTime reviewAt;
    StudentResponse student;
    CourseResponse course;
}
