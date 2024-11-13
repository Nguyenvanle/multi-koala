package com.duokoala.server.mapper;


import com.duokoala.server.dto.response.LessonStudentResponse;
import com.duokoala.server.entity.LessonStudent;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")// used in spring
public interface LessonStudentMapper {
    LessonStudentResponse toLessonStudentResponse(LessonStudent lessonStudent);
}
