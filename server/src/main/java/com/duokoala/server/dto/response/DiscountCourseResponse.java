package com.duokoala.server.dto.response;


import com.duokoala.server.enums.Status;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DiscountCourseResponse {
    String DiscountCourseId;
    DiscountResponse discount;
    CourseResponse course;
    Status status;
}
