package com.duokoala.server.entity;

import com.duokoala.server.entity.media.Image;
import com.duokoala.server.entity.media.Video;
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
public class Lesson {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String lessonId;
    String lessonName;
    String lessonDescription;
    LocalDateTime lessonUploadedAt;
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    Image image;
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    Video video;
    @ManyToOne
    Course course;
    boolean isDeleted;
}
