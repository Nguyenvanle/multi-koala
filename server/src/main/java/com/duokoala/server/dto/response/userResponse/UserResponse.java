package com.duokoala.server.dto.response.userResponse;

import com.duokoala.server.dto.response.RoleResponse;
import com.duokoala.server.dto.response.mediaResponse.ImageResponse;
import com.duokoala.server.entity.Role;
import com.duokoala.server.entity.media.Image;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

import java.util.Date;
import java.util.Set;
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponse {
    String userId;
    String username;
    String password;
    String firstname;
    String lastname;
    Date userBirth;
    String userBio;
    String userHometown;
    String email;
    ImageResponse image;
    Set<RoleResponse> roles;
}
