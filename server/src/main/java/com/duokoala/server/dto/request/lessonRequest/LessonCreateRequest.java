package com.duokoala.server.dto.request.lessonRequest;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class LessonCreateRequest {
    String lessonDescription;
    String imageUrl;
    String videoUrl;
    int videoDuration;
}
