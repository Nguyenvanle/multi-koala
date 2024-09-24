package com.duokoala.server.dto.response.questionResponse;

import com.duokoala.server.dto.response.answerResponse.AnswerResponse;
import com.duokoala.server.dto.response.answerResponse.AnswerSubmitResponse;
import com.duokoala.server.dto.response.mediaResponse.ImageResponse;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class QuestionSubmitResponse {
    String questionId;
    ImageResponse image;
    String questionDescription;
//    TestResponse test;
    List<AnswerSubmitResponse> answers;
}
