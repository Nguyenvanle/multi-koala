package com.duokoala.server.mapper;


import com.duokoala.server.dto.request.questionRequest.QuestionCreateRequest;
import com.duokoala.server.dto.request.questionRequest.QuestionUpdateRequest;
import com.duokoala.server.dto.response.AnswerResponse;
import com.duokoala.server.dto.response.QuestionResponse;
import com.duokoala.server.entity.Answer;
import com.duokoala.server.entity.Question;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper( componentModel = "spring")// used in spring
public interface QuestionMapper {
    @Mapping(target = "answers", ignore = true)
    Question toQuestion(QuestionCreateRequest request);
    QuestionResponse toQuestionResponse(Question question);
    AnswerResponse toAnswerResponse(Answer answer);
    @Mapping(target = "answers", ignore = true)
    void updateQuestion(@MappingTarget Question question, QuestionUpdateRequest request);
}
