package com.duokoala.server.dto.request.fieldRequest;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FieldUpdateRequest {
    String fieldName;
    String fieldDescription;
}
