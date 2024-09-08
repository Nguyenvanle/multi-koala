package com.duokoala.server.dto.response;
import com.duokoala.server.dto.response.userResponse.StudentResponse;
import com.duokoala.server.entity.Test;
import com.duokoala.server.entity.user.Student;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import java.time.LocalDateTime;

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
    TestResponse test;
    StudentResponse student;
}