package com.duokoala.server.dto.request.discountRequest;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DiscountCreateRequest {
    float discountRate;
    LocalDate startDate;
    LocalDate endDate;
}
