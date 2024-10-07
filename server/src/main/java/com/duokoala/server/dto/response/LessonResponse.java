package com.duokoala.server.dto.response;

import com.duokoala.server.dto.response.courseResponse.CourseResponse;
import com.duokoala.server.dto.response.mediaResponse.ImageResponse;
import com.duokoala.server.dto.response.mediaResponse.VideoResponse;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

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
    LocalDateTime lessonUploadedAt;
    CourseResponse course;
    boolean isDemo;
    boolean isDeleted;
}
