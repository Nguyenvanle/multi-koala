package com.duokoala.server.entity.user;

import com.duokoala.server.entity.Role;
import com.duokoala.server.entity.media.Image;
import jakarta.persistence.*;
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
@Inheritance(strategy = InheritanceType.JOINED)
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String userId;
    String username;
    String password;
    String firstname;
    String lastname;
    LocalDate userBirth;
    String userBio;
    String userHometown;
    @Email
    String email;
    @OneToOne
    Image image;
    @ManyToMany
    Set<Role> roles;
    boolean isDeleted;
}
