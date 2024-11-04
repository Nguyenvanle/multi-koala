package com.duokoala.server.mapper;


import com.duokoala.server.dto.request.quizResultRequest.QuizResultCreateRequest;
import com.duokoala.server.dto.request.quizResultRequest.QuizResultUpdateRequest;
import com.duokoala.server.dto.response.quizResultResponse.QuizResultResponse;
import com.duokoala.server.entity.QuizResult;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")// used in spring
public interface QuizResultMapper {
    QuizResult toQuizResult(QuizResultCreateRequest request);

    @Mapping(target = "questions", ignore = true)
    QuizResultResponse toQuizResultResponse(QuizResult quizResult);

    void updateQuizResult(@MappingTarget QuizResult quizResult, QuizResultUpdateRequest request);
}
