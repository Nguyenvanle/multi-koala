package com.duokoala.server.service;

import com.duokoala.server.dto.request.ActivityCreateRequest;
import com.duokoala.server.dto.response.ActivityResponse;
import com.duokoala.server.entity.Activity;
import com.duokoala.server.entity.user.Admin;
import com.duokoala.server.exception.AppException;
import com.duokoala.server.exception.ErrorCode;
import com.duokoala.server.mapper.userMapper.ActivityMapper;
import com.duokoala.server.repository.ActivityRepository;
import com.duokoala.server.repository.userRepository.AdminRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ActivityService {
    ActivityRepository activityRepository;
    ActivityMapper activityMapper;
    AdminRepository adminRepository;

    public ActivityResponse createActivity(ActivityCreateRequest request) {
        Activity activity = activityMapper.toActivity(request);
        activity.setHappenAt(new Date());
        Admin admin = adminRepository.findById(request.getAdminId())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        activity.setActionedByAdmin(admin);
        return  activityMapper.toActivityResponse(activityRepository.save(activity));
    }

    public List<ActivityResponse> getActivities() {
        var activities = activityRepository.findAll();
        return activities.stream().map(activityMapper::toActivityResponse).toList();
    }
}
