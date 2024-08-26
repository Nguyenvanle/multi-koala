package com.duokoala.server.dto.response.userResponse;

import com.duokoala.server.entity.user.Admin;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AdminResponse extends UserResponse {
    AdminResponse createByAdmin;
}
