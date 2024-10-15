package com.duokoala.server.entity;
import com.duokoala.server.entity.user.Student;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Favourite {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String favouriteId;
    LocalDateTime favouriteAt;
    @ManyToOne
    Student student;
    @ManyToOne
    Course course;
}
