package com.duokoala.server.entity;

import com.duokoala.server.entity.user.Admin;
import com.duokoala.server.entity.user.Teacher;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String paymentId;
    BigDecimal totalAmount;
    float teacherAmount;
    float adminAmount;
    LocalDateTime processedDate;
    @OneToOne
    EnrollCourse enrollCourse;
    @ManyToOne
    Admin admin;
    @ManyToOne
    Teacher teacher;
}
