package com.duokoala.server.entity.media;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
@Entity
public class Video {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String videoId;
    String videoUrl;
    double videoDuration;
}
