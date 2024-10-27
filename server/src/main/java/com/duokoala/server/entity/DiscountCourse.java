package com.duokoala.server.entity;

import com.duokoala.server.enums.courseEnums.Status;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class DiscountCourse {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String DiscountCourseId;
    @ManyToOne
    Discount discount;
    @ManyToOne
    Course course;
    @Enumerated(EnumType.STRING) //enum but save in db with string
    Status status;
}
