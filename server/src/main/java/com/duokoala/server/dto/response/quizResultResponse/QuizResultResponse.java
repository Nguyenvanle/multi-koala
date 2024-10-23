package com.duokoala.server.dto.response.quizResultResponse;
import com.duokoala.server.dto.response.questionResponse.QuestionSubmitResponse;
import lombok.*;
import lombok.experimental.FieldDefaults;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class QuizResultResponse {
    String quizResultId;
    int totalQuestion;
    int answeredQuestions;
    int correctAnswers;
    LocalDateTime dateTaken;
    List<QuestionSubmitResponse> questions;
//    TestResponse test;
//    StudentResponse student;
}
