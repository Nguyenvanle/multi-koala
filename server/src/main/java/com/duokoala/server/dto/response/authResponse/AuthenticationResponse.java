package com.duokoala.server.dto.response.authResponse;

import com.duokoala.server.dto.response.RoleResponse;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AuthenticationResponse {
    String token;
    String userId;
    Set<RoleResponse> roles;
    boolean authenticated;
}
