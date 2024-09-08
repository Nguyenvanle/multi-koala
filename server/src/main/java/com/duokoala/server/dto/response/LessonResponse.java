package com.duokoala.server.dto.response;

import com.duokoala.server.dto.response.mediaResponse.ImageResponse;
import com.duokoala.server.dto.response.mediaResponse.VideoResponse;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class LessonResponse {
    String lessonId;
    String lessonName;
    String lessonDescription;
    ImageResponse image;
    VideoResponse video;
    CourseResponse course;
    boolean isDeleted;
}
