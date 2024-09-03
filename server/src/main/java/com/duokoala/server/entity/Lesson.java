package com.duokoala.server.entity;
import com.duokoala.server.entity.media.Image;
import com.duokoala.server.entity.media.Video;
import com.duokoala.server.entity.user.Admin;
import com.duokoala.server.entity.user.Teacher;
import com.duokoala.server.enums.Status;
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
public class Lesson {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String lessonId;
    int lessonDuration;
    String lessonDescription;
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    Image image;
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    Video video;
    @ManyToOne
    Course course;
    boolean isDeleted;
}
