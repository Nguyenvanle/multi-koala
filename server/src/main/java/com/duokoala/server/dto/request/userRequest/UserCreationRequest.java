package com.duokoala.server.dto.request.userRequest;

import jakarta.validation.constraints.Email;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserCreationRequest {
    String username;
    String password;
    String firstname;
    String lastname;
    LocalDate userBirth;
    String userBio;
    String userHometown;
    @Email
    String email;
    String imageUrl;
}
