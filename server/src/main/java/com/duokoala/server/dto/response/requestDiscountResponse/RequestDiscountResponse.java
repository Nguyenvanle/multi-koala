package com.duokoala.server.dto.response.requestDiscountResponse;

import com.duokoala.server.dto.response.courseResponse.CourseResponse;
import com.duokoala.server.dto.response.userResponse.AdminResponse;
import com.duokoala.server.dto.response.userResponse.teacherResponse.TeacherResponse;
import com.duokoala.server.enums.courseEnums.Status;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RequestDiscountResponse {
    String RequestDiscountId;
    float discountRate;
    Status status;
    CourseResponse course;
    TeacherResponse submittedByTeacher;
    AdminResponse approvedByAdmin;
}
