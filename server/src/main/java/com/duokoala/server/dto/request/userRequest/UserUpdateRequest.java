package com.duokoala.server.dto.request.userRequest;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserUpdateRequest {
    //    String password;
    String firstname;
    String lastname;
    LocalDate userBirth;
    String userBio;
    String userHometown;
    //    String imageUrl;
    boolean isFirstLogin;
}
