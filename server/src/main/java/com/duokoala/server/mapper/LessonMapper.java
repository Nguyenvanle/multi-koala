package com.duokoala.server.mapper;


import com.duokoala.server.dto.request.lessonRequest.LessonCreateRequest;
import com.duokoala.server.dto.request.lessonRequest.LessonUpdateRequest;
import com.duokoala.server.dto.response.LessonResponse;
import com.duokoala.server.entity.Lesson;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper( componentModel = "spring")// used in spring
public interface LessonMapper {
    Lesson toLesson(LessonCreateRequest request);
    LessonResponse toLessonResponse(Lesson lesson);
    void updateLesson(@MappingTarget Lesson lesson, LessonUpdateRequest request);
}
