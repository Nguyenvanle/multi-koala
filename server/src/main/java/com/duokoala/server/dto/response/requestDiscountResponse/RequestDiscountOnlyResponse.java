package com.duokoala.server.dto.response.requestDiscountResponse;

import com.duokoala.server.dto.response.userResponse.AdminResponse;
import com.duokoala.server.enums.courseEnums.Status;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RequestDiscountOnlyResponse {
    String RequestDiscountId;
    float discountRate;
    Status status;
    AdminResponse approvedByAdmin;
}
