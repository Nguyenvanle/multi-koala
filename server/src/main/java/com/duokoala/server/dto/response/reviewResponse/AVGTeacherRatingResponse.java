package com.duokoala.server.dto.response.reviewResponse;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AVGTeacherRatingResponse {
    float AVGTeacherRating;
}
