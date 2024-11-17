package com.duokoala.server.entity;

import com.duokoala.server.entity.media.Image;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String questionId;
    String questionDescription;
    LocalDateTime questionUploadedAt;
    @ManyToOne
    @JsonBackReference
    Test test;
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    Image image;
    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true)
    List<Answer> answers;
    @Builder.Default
    @JsonIgnore
    boolean isActive = true;
}
