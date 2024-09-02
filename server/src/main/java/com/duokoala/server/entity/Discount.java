package com.duokoala.server.entity;

import com.duokoala.server.entity.user.Admin;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

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
    @OneToMany(mappedBy = "discount",cascade = CascadeType.REMOVE, orphanRemoval = true)
    Set<DiscountCourse> discountCourses;
}
