package com.duokoala.server.service;

import com.duokoala.server.dto.request.lessonRequest.LessonCreateRequest;
import com.duokoala.server.dto.request.lessonRequest.LessonUpdateRequest;
import com.duokoala.server.dto.response.LessonResponse;
import com.duokoala.server.entity.Course;
import com.duokoala.server.entity.Lesson;
import com.duokoala.server.entity.media.Image;
import com.duokoala.server.entity.media.Video;
import com.duokoala.server.exception.AppException;
import com.duokoala.server.exception.ErrorCode;
import com.duokoala.server.mapper.LessonMapper;
import com.duokoala.server.repository.CourseRepository;
import com.duokoala.server.repository.LessonRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class LessonService {
    LessonRepository lessonRepository;
    CourseRepository courseRepository;
    LessonMapper lessonMapper;

    public LessonResponse create(String courseId, LessonCreateRequest request) {
        Lesson lesson = lessonMapper.toLesson(request);
        Image image = Image.builder()
                .imageUrl(request.getImageUrl())
                .build();
        Video video = Video.builder()
                .videoUrl(request.getVideoUrl())
                .videoDuration(request.getVideoDuration())
                .build();
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND));
        lesson.setImage(image);
        lesson.setVideo(video);
        lesson.setCourse(course);
        lesson.setDeleted(false);
        return lessonMapper.toLessonResponse(lessonRepository.save(lesson));
    }

    public LessonResponse update(String lessonId, LessonUpdateRequest request) {
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new AppException(ErrorCode.LESSON_NOT_FOUND));
        lessonMapper.updateLesson(lesson,request);
        lesson.getImage().setImageUrl(request.getImageUrl());
        lesson.getVideo().setVideoUrl(request.getVideoUrl());
        lesson.getVideo().setVideoDuration(request.getVideoDuration());
        return lessonMapper.toLessonResponse(lessonRepository.save(lesson));
    }
}
