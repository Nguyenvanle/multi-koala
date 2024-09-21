package com.duokoala.server.dto.response.courseResponse;

import com.duokoala.server.dto.response.FieldResponse;
import com.duokoala.server.dto.response.TypeResponse;
import com.duokoala.server.dto.response.mediaResponse.ImageResponse;
import com.duokoala.server.dto.response.userResponse.AdminResponse;
import com.duokoala.server.dto.response.userResponse.TeacherResponse;
import com.duokoala.server.enums.Level;
import com.duokoala.server.enums.Status;
import lombok.*;
import lombok.experimental.FieldDefaults;
import java.time.LocalDateTime;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CourseResponse {
    String courseId;
    String courseName;
    LocalDateTime courseUploadedAt;
    float coursePrice;
    String courseDescription;
    Level courseLevel;
    Set<TypeResponse> types;
    Set<FieldResponse> fields;
    ImageResponse image;
    TeacherResponse uploadedByTeacher;
    AdminResponse approvedByAdmin;
    Status status;
    boolean isDeleted;
}
