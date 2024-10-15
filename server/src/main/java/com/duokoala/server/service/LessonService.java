package com.duokoala.server.service;

import com.duokoala.server.dto.request.lessonRequest.LessonCreateRequest;
import com.duokoala.server.dto.request.lessonRequest.LessonUpdateRequest;
import com.duokoala.server.dto.response.LessonResponse;
import com.duokoala.server.entity.Course;
import com.duokoala.server.entity.Lesson;
import com.duokoala.server.exception.AppException;
import com.duokoala.server.exception.ErrorCode;
import com.duokoala.server.mapper.LessonMapper;
import com.duokoala.server.repository.CourseRepository;
import com.duokoala.server.repository.LessonRepository;
import com.duokoala.server.service.mediaService.CloudinaryService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class LessonService {
    LessonRepository lessonRepository;
    CourseRepository courseRepository;
    LessonMapper lessonMapper;
    CloudinaryService cloudinaryService;

    public LessonResponse create(String courseId, LessonCreateRequest request) {
        Lesson lesson = lessonMapper.toLesson(request);
//        Image image = Image.builder()
//                .imageUrl(request.getImageUrl())
//                .build();
//        Video video = Video.builder()
//                .videoUrl(request.getVideoUrl())
//                .videoDuration(request.getVideoDuration())
//                .build();
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND));
//        lesson.setImage(image);
//        lesson.setVideo(video);
        lesson.setLessonUploadedAt(LocalDateTime.now());
        lesson.setCourse(course);
        lesson.setDeleted(false);
        return lessonMapper.toLessonResponse(lessonRepository.save(lesson));
    }

    public LessonResponse update(String lessonId, LessonUpdateRequest request) {
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new AppException(ErrorCode.LESSON_NOT_FOUND));
        lessonMapper.updateLesson(lesson,request);
//        lesson.getImage().setImageUrl(request.getImageUrl());
//        lesson.getVideo().setVideoUrl(request.getVideoUrl());
//        lesson.getVideo().setVideoDuration(request.getVideoDuration());
        return lessonMapper.toLessonResponse(lessonRepository.save(lesson));
    }

    @Transactional
    public LessonResponse uploadImage(String lessonId, MultipartFile imageFile) throws IOException {
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new AppException(ErrorCode.LESSON_NOT_FOUND));
        if (lesson.getImage() != null) cloudinaryService.deleteImage(lesson.getImage().getImageId());
        lesson.setImage(cloudinaryService.uploadImage(imageFile));
        return lessonMapper.toLessonResponse(lessonRepository.save(lesson));
    }

    @Transactional
    public LessonResponse uploadVideo(String lessonId, MultipartFile videoFile) throws IOException {
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new AppException(ErrorCode.LESSON_NOT_FOUND));
        if (lesson.getVideo() != null) cloudinaryService.deleteVideo(lesson.getVideo().getVideoId());
        lesson.setVideo(cloudinaryService.uploadVideo(videoFile));
        return lessonMapper.toLessonResponse(lessonRepository.save(lesson));
    }


    public LessonResponse get(String lessonId) {
        return lessonMapper.toLessonResponse(lessonRepository.findById(lessonId)
                .orElseThrow(() -> new AppException(ErrorCode.LESSON_NOT_FOUND)));
    }

    public List<LessonResponse> getAll() {
        var lessons = lessonRepository.findAll();
        return lessons.stream().map(lessonMapper::toLessonResponse).toList();
    }

    public List<LessonResponse> getListByCourseId(String courseId) {
        var lessons = lessonRepository.getListByCourseId(courseId);
        return lessons.stream().map(lessonMapper::toLessonResponse).toList();
    }

    public void delete(String lessonId) {
        var lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new AppException(ErrorCode.LESSON_NOT_FOUND));
        lesson.setDeleted(true);
        lessonRepository.save(lesson);
    }

}
