package com.duokoala.server.entity;
import com.duokoala.server.entity.media.Image;
import com.duokoala.server.entity.user.Admin;
import com.duokoala.server.entity.user.Teacher;
import com.duokoala.server.enums.Status;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
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
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String courseId;
    String courseName;
    LocalDateTime courseUploadedAt;
    float coursePrice;
    String courseDescription;
    @ManyToMany
    Set<Type> types;
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    Image image;
    @ManyToOne
    Teacher uploadedByTeacher;
    @ManyToOne
    Admin approvedByAdmin;
    @Enumerated(EnumType.STRING)
    Status status;
    boolean isDeleted;
    @OneToMany(mappedBy = "course", orphanRemoval = true)
    Set<DiscountCourse> discountCourses;
}
