package com.duokoala.server.dto.request.quizResultRequest;

import com.duokoala.server.dto.request.questionRequest.QuestionSubmitRequest;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class QuizResultSubmitRequest {
    List<QuestionSubmitRequest> answerSubmitList;
}
