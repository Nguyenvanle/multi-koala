package com.duokoala.server.dto.request.mediaRequest;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class VideoUpdateRequest {
    String videoUrl;
    int videoDuration;
}
