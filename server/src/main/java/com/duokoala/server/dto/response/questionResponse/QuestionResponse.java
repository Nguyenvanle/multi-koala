package com.duokoala.server.dto.response.questionResponse;

import com.duokoala.server.dto.response.answerResponse.AnswerResponse;
import com.duokoala.server.dto.response.mediaResponse.ImageResponse;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class QuestionResponse {
    String questionId;
    ImageResponse image;
    String questionDescription;
    List<AnswerResponse> answers;
}
