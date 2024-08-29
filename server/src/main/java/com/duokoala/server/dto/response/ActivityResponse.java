package com.duokoala.server.dto.response;

import com.duokoala.server.dto.response.userResponse.AdminResponse;
import com.duokoala.server.entity.user.Admin;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ActivityResponse {
    String activityId;
    String activityDescription;
    Date happenAt;
    AdminResponse actionedByAdmin;
}
