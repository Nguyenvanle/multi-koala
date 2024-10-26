package com.duokoala.server.entity;

import com.duokoala.server.entity.user.Admin;
import com.duokoala.server.entity.user.Teacher;
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
public class RequestDiscount {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String RequestDiscountId;
    float discountRate;
    @Enumerated(EnumType.STRING) //enum but save in db with string
    Status status;
    @ManyToOne
    Course course;
    @ManyToOne
    Teacher submittedByTeacher;
    @ManyToOne
    Admin approvedByAdmin;
}
