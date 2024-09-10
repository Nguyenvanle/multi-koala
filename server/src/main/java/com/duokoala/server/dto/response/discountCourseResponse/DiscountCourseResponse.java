package com.duokoala.server.dto.response.discountCourseResponse;


import com.duokoala.server.dto.response.CourseResponse;
import com.duokoala.server.dto.response.DiscountResponse;
import com.duokoala.server.enums.Status;
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
