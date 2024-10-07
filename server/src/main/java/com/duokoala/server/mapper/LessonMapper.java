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
    @Mapping(target = "isDemo", source = "demo")
    Lesson toLesson(LessonCreateRequest request);
    LessonResponse toLessonResponse(Lesson lesson);
    @Mapping(target = "demo", source = "demo")
    void updateLesson(@MappingTarget Lesson lesson, LessonUpdateRequest request);
}
