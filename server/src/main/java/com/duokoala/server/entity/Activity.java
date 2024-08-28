package com.duokoala.server.entity;

import com.duokoala.server.entity.user.Admin;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Activity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String activityId;
    String activityDescription;
    Date happenAt;
    @ManyToOne
    Admin actionedByAdmin;
}
