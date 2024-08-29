package com.duokoala.server.entity;

import com.duokoala.server.entity.user.Admin;
import com.duokoala.server.entity.user.Teacher;
import com.duokoala.server.enums.Status;
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

    @Enumerated(EnumType.STRING) //enum but save in db with string
    Status status;
}
