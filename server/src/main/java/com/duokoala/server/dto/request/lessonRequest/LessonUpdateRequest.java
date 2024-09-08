package com.duokoala.server.dto.request.lessonRequest;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class LessonUpdateRequest {
    String lessonName;
    String lessonDescription;
    String imageUrl;
    String videoUrl;
    int videoDuration;
}
