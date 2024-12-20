package com.duokoala.server.entity;

import com.duokoala.server.entity.user.Student;
import com.duokoala.server.enums.courseEnums.Level;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Recommend {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String RecommendId;
    int studyTimeGoal;
    @ManyToMany
    Set<Field> favoriteFields;
    @Enumerated(EnumType.STRING)
    Level learningLevel;
    LocalDateTime takenDate;
    @OneToOne
    Student student;
}
