package com.duokoala.server.dto.response.certificationResponse;

import com.duokoala.server.dto.response.userResponse.AdminResponse;
import com.duokoala.server.dto.response.userResponse.TeacherResponse;
import com.duokoala.server.entity.media.Image;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.List;

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
    List<Image> proofImages;
    String status;
}
