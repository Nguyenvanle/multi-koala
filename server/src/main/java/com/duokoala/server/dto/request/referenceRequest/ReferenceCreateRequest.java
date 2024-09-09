package com.duokoala.server.dto.request.referenceRequest;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReferenceCreateRequest {
    int studyTimeGoal;
    Set<String> favoriteFields;
    String learningLevel;
}
