package com.duokoala.server.dto.request.testRequest;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TestCreateRequest {
    String testDescription;
    int passingScore;
}
