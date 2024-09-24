package com.duokoala.server.dto.response.answerResponse;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AnswerResponse {
    String answerId;
    String answerDescription;
    boolean isCorrect;
}
