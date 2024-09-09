package com.duokoala.server.dto.request.fieldRequest;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FieldCreateRequest {
    String fieldName;
    String fieldDescription;
}
