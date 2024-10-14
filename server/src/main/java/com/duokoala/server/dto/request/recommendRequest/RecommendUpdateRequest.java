package com.duokoala.server.dto.request.recommendRequest;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RecommendUpdateRequest {
    int studyTimeGoal;
    Set<String> favoriteFields;
    String learningLevel;
}
