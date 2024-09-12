package com.duokoala.server.service.userService;

import com.duokoala.server.dto.request.userRequest.TeacherCreationRequest;
import com.duokoala.server.dto.request.userRequest.TeacherUpdateRequest;
import com.duokoala.server.dto.response.userResponse.TeacherResponse;
import com.duokoala.server.entity.user.Teacher;
import com.duokoala.server.enums.Role;
import com.duokoala.server.exception.AppException;
import com.duokoala.server.exception.ErrorCode;
import com.duokoala.server.mapper.userMapper.TeacherMapper;
import com.duokoala.server.repository.ReviewRepository;
import com.duokoala.server.repository.userRepository.TeacherRepository;
import com.duokoala.server.repository.userRepository.UserRepository;
import com.duokoala.server.service.AuthenticationService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TeacherService {
    TeacherRepository teacherRepository;
    TeacherMapper teacherMapper;
    UserRepository userRepository;
    UserService userService;
    ReviewRepository reviewRepository;
    AuthenticationService authenticationService;

    public float getAvgRatingTeacher(String teacherId) {
        Float avgRating = reviewRepository.getAvgTeacher(teacherId);
        return avgRating!=null? avgRating:0.0f;
    }

    public TeacherResponse createTeacher(TeacherCreationRequest request) {
        if(userRepository.existsByUsername(request.getUsername()))
            throw new AppException(ErrorCode.USERNAME_EXISTED);
        Teacher teacher = teacherMapper.toTeacher(request);
        teacher.setImage(userService.createNewAvatar(request.getImageUrl()));
        teacher.setRoles(userService.transferRoles(Role.TEACHER.name()));
        teacher.setDeleted(false);
        teacher.setFirstLogin(true);
        teacher.setPassword(userService.encodePassword(request.getPassword()));
        return teacherMapper.toTeacherResponse(teacherRepository.save(teacher),0.0f);
    }

    public TeacherResponse updateTeacher(String teacherId, TeacherUpdateRequest request) {
        Teacher teacher = teacherRepository.findById(teacherId)
                .orElseThrow(() -> new AppException(ErrorCode.TEACHER_NOT_FOUND));
        teacherMapper.updateTeacher(teacher,request);
        userService.updateAvatarByUserId(teacher.getImage(), request.getImageUrl());
        teacher.setPassword(userService.encodePassword(request.getPassword()));
        return teacherMapper.toTeacherResponse(teacherRepository.save(teacher)
        ,getAvgRatingTeacher(teacherId));
    }

    public TeacherResponse getTeacher(String teacherId) {
        var teacher = teacherRepository.findById(teacherId)
                .orElseThrow(() -> new AppException(ErrorCode.TEACHER_NOT_FOUND));
        return teacherMapper.toTeacherResponse(teacher,getAvgRatingTeacher(teacherId));
    }

    public TeacherResponse getMyInfo() {
        var teacher = authenticationService.getAuthenticatedTeacher();
        return teacherMapper.toTeacherResponse(teacher,getAvgRatingTeacher(teacher.getUserId()));
    }

    public List<TeacherResponse> getTeachers() {
        var teachers = teacherRepository.findAll();
        return teachers.stream().map(teacher -> teacherMapper
                .toTeacherResponse(teacher,getAvgRatingTeacher(teacher.getUserId()))
        ).toList();
    }
}
