package com.duokoala.server.dto.request.certificationRequest;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CertificationCreateRequest {
    String certificateName;
    LocalDate issueDate;
    LocalDate expiryDate;
    String issuingOrganization;
}
