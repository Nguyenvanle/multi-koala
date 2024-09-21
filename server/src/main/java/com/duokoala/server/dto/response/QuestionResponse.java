package com.duokoala.server.dto.response;

import com.duokoala.server.dto.response.mediaResponse.ImageResponse;
import com.duokoala.server.entity.media.Image;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class QuestionResponse {
    String questionId;
    ImageResponse image;
    String questionDescription;
    TestResponse test;
    List<AnswerResponse> answers;
}
