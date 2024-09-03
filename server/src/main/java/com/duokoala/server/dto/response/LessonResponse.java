package com.duokoala.server.dto.response;

import com.duokoala.server.entity.Course;
import com.duokoala.server.entity.media.Image;
import com.duokoala.server.entity.media.Video;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class LessonResponse {
    String lessonId;
    int lessonDuration;
    String lessonDescription;
    Image image;
    Video video;
    Course course;
    boolean isDeleted;
}
