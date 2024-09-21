package com.duokoala.server.dto.request.certificationRequest;

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
public class CertificationCreateRequest {
    String certificateName;
    LocalDate issueDate;
    LocalDate expiryDate;
    String issuingOrganization;
    List<String> proofImageUrls;
}
