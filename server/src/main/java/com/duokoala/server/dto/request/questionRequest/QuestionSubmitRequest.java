package com.duokoala.server.dto.request.questionRequest;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class QuestionSubmitRequest {
    String questionId;
    String selectedAnswerId;
}