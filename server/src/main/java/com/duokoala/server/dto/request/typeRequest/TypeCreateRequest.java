package com.duokoala.server.dto.request.typeRequest;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TypeCreateRequest {
    String typeName;
    String typeDescription;
}
