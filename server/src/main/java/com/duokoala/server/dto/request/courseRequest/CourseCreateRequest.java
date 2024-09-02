package com.duokoala.server.dto.request.courseRequest;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CourseCreateRequest {
    String courseName;
    float coursePrice;
    String courseDescription;
    Set<String> types;
    String imageUrl;
}
