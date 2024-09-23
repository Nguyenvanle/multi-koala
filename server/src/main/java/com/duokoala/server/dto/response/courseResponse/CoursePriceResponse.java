package com.duokoala.server.dto.response.courseResponse;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CoursePriceResponse {
    float maxCoursePrice;
    float minCoursePrice;
}
