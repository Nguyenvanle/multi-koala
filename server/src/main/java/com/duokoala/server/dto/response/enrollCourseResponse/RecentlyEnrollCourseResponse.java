package com.duokoala.server.dto.response.enrollCourseResponse;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RecentlyEnrollCourseResponse {
    String studentName;
    String studentEmail;
    String courseName;
    float process;
    String status;
    LocalDateTime enrollAt;
    float coursePrice;
}
