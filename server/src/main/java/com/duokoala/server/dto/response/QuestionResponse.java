package com.duokoala.server.dto.response;
import com.duokoala.server.entity.Test;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class QuestionResponse {
    String questionId;
    String questionDescription;
    Test test;
    List<AnswerResponse> answers;
}
