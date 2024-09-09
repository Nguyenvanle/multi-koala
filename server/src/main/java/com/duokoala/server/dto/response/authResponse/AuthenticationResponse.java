package com.duokoala.server.dto.response.authResponse;

import com.duokoala.server.dto.response.userResponse.UserResponse;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AuthenticationResponse {
    String token;
    UserResponse user;
    boolean authenticated;
}
