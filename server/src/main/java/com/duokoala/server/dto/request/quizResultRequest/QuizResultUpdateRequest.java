package com.duokoala.server.dto.request.quizResultRequest;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class QuizResultUpdateRequest {
    int answeredQuestions;
    int correctAnswers;
}