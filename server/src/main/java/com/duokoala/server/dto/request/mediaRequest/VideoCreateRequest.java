package com.duokoala.server.dto.request.mediaRequest;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class VideoCreateRequest {
    String videoUrl;
    int videoDuration;
}
