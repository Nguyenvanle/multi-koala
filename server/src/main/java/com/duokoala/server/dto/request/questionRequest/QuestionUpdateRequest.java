package com.duokoala.server.dto.request.questionRequest;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class QuestionUpdateRequest {
    String questionDescription;
    List<AnswerRequest> answers;
}
