package com.duokoala.server.entity;
import com.duokoala.server.entity.media.Image;
import com.duokoala.server.entity.user.Admin;
import com.duokoala.server.entity.user.Teacher;
import com.duokoala.server.enums.courseEnums.Level;
import com.duokoala.server.enums.courseEnums.Status;
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
    LocalDateTime courseResponsibilityEndAt;
    float coursePrice;
    String courseDescription;
    @Enumerated(EnumType.STRING)
    Level courseLevel;
    @ManyToMany
    Set<Type> types;
    @ManyToMany
    Set<Field> fields;
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
