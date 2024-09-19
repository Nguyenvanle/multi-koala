package com.duokoala.server.dto.response.reviewResponse;

import com.duokoala.server.dto.response.CourseResponse;
import com.duokoala.server.dto.response.userResponse.StudentResponse;
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
