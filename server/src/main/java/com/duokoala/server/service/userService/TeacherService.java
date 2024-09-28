package com.duokoala.server.service.userService;

import com.duokoala.server.dto.request.userRequest.TeacherCreationRequest;
import com.duokoala.server.dto.request.userRequest.TeacherUpdateRequest;
import com.duokoala.server.dto.response.userResponse.teacherResponse.StatisticTeacherResponse;
import com.duokoala.server.dto.response.userResponse.teacherResponse.TeacherResponse;
import com.duokoala.server.entity.user.Teacher;
import com.duokoala.server.enums.Role;
import com.duokoala.server.exception.AppException;
import com.duokoala.server.exception.ErrorCode;
import com.duokoala.server.mapper.userMapper.TeacherMapper;
import com.duokoala.server.repository.ReviewRepository;
import com.duokoala.server.repository.userRepository.TeacherRepository;
import com.duokoala.server.service.AuthenticationService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class TeacherService {
    TeacherRepository teacherRepository;
    TeacherMapper teacherMapper;
    UserService userService;
    ReviewRepository reviewRepository;
    AuthenticationService authenticationService;

    public float getAvgRatingTeacher(String teacherId) {
        Float avgRating = reviewRepository.getAvgTeacher(teacherId);
        return avgRating != null ? avgRating : 0.0f;
    }

    public TeacherResponse createTeacher(TeacherCreationRequest request) {
        Teacher teacher = teacherMapper.toTeacher(request);
        teacher.setImage(userService.createNewAvatar(request.getImageUrl()));
        teacher.setRoles(userService.transferRoles(Role.TEACHER.name()));
        teacher.setDeleted(false);
        teacher.setFirstLogin(true);
        teacher.setPassword(userService.encodePassword(request.getPassword()));
        try {
            teacherRepository.save(teacher);
        } catch (DataIntegrityViolationException e) {
            throw new AppException(ErrorCode.USERNAME_EXISTED);
        }
        return teacherMapper.toTeacherResponse(teacher/*, 0.0f*/);
    }

    public TeacherResponse updateTeacher(String teacherId, TeacherUpdateRequest request) {
        Teacher teacher = teacherRepository.findById(teacherId)
                .orElseThrow(() -> new AppException(ErrorCode.TEACHER_NOT_FOUND));
        teacherMapper.updateTeacher(teacher, request);
        userService.updateAvatarByUserId(teacher.getImage(), request.getImageUrl());
        teacher.setPassword(userService.encodePassword(request.getPassword()));
        return teacherMapper.toTeacherResponse(teacherRepository.save(teacher)
                /*,getAvgRatingTeacher(teacherId)*/);
    }

    public TeacherResponse getTeacher(String teacherId) {
        var teacher = teacherRepository.findById(teacherId)
                .orElseThrow(() -> new AppException(ErrorCode.TEACHER_NOT_FOUND));
        return teacherMapper.toTeacherResponse(teacher);
    }

    public TeacherResponse getMyInfo() {
        var teacher = authenticationService.getAuthenticatedTeacher();
        return teacherMapper.toTeacherResponse(teacher/*, getAvgRatingTeacher(teacher.getUserId())*/);
    }

    public List<TeacherResponse> getTeachers() {
        var teachers = teacherRepository.findAll();
        /*, getAvgRatingTeacher(teacher.getUserId())*/
        return teachers.stream().map(teacherMapper::toTeacherResponse
        ).toList();
    }

    public StatisticTeacherResponse getStatisticTeacher() {
        var teacherId = authenticationService.getAuthenticatedTeacher().getUserId();
        return StatisticTeacherResponse.builder()
                .totalCourses(teacherRepository.countTotalCourses(teacherId))
                .totalApprovedCourses(teacherRepository.countTotalApprovedCourses(teacherId))
                .totalEnrollments(teacherRepository.countTotalEnrollments(teacherId))
                .totalStudents(teacherRepository.countTotalStudents(teacherId))
                .totalCompletedCourses(teacherRepository.countTotalCompletedCourses(teacherId))
                .totalPrices(teacherRepository.sumTotalPrices(teacherId))
                .passRatingPerTest(teacherRepository.calculatePassRatingPerTest(teacherId))
                .correctRatingPerQuestion(teacherRepository.calculateCorrectRatingPerQuestion(teacherId))
                .build();
    }
}
