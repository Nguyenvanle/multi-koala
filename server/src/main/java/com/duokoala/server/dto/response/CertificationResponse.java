package com.duokoala.server.dto.response;

import com.duokoala.server.dto.response.userResponse.AdminResponse;
import com.duokoala.server.dto.response.userResponse.TeacherResponse;
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
    TeacherResponse uploadedByTeacher;
    AdminResponse approvedByAdmin;
    String status;
}
