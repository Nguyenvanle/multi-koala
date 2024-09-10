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
    int studyTimeGoal; //thời gian học trong 1 ngày
    Set<String> favoriteFields;//lĩnh vực yêu thích (exist)
    String learningLevel; //cấp độ (enum)
}
