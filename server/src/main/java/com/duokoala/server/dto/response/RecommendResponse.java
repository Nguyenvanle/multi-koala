package com.duokoala.server.dto.response;

import com.duokoala.server.dto.response.userResponse.StudentResponse;
import com.duokoala.server.enums.Level;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RecommendResponse {
    String recommendId;
    int studyTimeGoal;
    Set<FieldResponse> favoriteFields;
    Level learningLevel;
    LocalDateTime takenDate;
    StudentResponse student;
}
