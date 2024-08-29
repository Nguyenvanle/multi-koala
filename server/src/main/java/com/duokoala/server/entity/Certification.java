package com.duokoala.server.entity;

import com.duokoala.server.entity.user.Admin;
import com.duokoala.server.entity.user.Teacher;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Certification {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String certificateId;
    String certificateName;
    LocalDate issueDate;
    LocalDate expiryDate;
    String issuingOrganization;

    @ManyToOne
    Teacher uploadedByTeacher;
    @ManyToOne
    Admin approvedByAdmin;

    String status;
}
