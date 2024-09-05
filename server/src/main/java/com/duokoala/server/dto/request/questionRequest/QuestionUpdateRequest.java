package com.duokoala.server.dto.request.questionRequest;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class QuestionUpdateRequest {
    String testDescription;
    Set<String> answers;
    int correctIndex;
}
