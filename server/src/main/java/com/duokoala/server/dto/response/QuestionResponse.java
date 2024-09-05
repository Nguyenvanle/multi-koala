package com.duokoala.server.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class QuestionResponse {
    String questionId;
    String questionDescription;
    TestResponse test;
    List<AnswerResponse> answers;
}
