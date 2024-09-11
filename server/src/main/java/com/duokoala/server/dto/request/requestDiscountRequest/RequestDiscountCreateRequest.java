package com.duokoala.server.dto.request.requestDiscountRequest;

import com.duokoala.server.entity.Course;
import com.duokoala.server.entity.user.Teacher;
import com.duokoala.server.enums.Status;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RequestDiscountCreateRequest {
    float discountRate;
}
