package com.duokoala.server.dto.response;

import com.duokoala.server.dto.response.userResponse.AdminResponse;
import com.duokoala.server.entity.user.Admin;
import jakarta.persistence.ManyToOne;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DiscountResponse {
    String discountId;
    float discountRate;
    LocalDate startDate;
    LocalDate endDate;
    AdminResponse createdByAdmin;
}
