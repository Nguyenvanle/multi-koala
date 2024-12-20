package com.duokoala.server.dto.request.courseRequest;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CourseUpdateRequest {
    String courseName;
    float coursePrice;
    String courseDescription;
    String courseLevel;
    Set<String> types;
    Set<String> fields;
    LocalDateTime courseResponsibilityEndAt;
//    String imageUrl;
}
