package com.duokoala.server.entity;

import com.duokoala.server.entity.user.Admin;
import com.duokoala.server.enums.Status;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Discount {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String discountId;
    float discountRate;
    LocalDate startDate;
    LocalDate endDate;
    @ManyToOne
    Admin createdByAdmin;
}
