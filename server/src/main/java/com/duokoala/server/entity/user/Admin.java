package com.duokoala.server.entity.user;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
//@Builder
@Entity
public class Admin extends User {
    @ManyToOne
    Admin createByAdmin;
}
