package com.duokoala.server.dto.response;

import com.duokoala.server.entity.user.Admin;
import com.duokoala.server.entity.user.Teacher;
import jakarta.persistence.ManyToOne;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CertificationResponse {
    String certificateId;
    String certificateName;
    LocalDate issueDate;
    LocalDate expiryDate;
    String issuingOrganization;
    Teacher uploadedByTeacher;
    Admin approvedByAdmin;
    String status;
}
