package com.duokoala.server.service.userService;

import com.duokoala.server.dto.request.userRequest.StudentCreationRequest;
import com.duokoala.server.dto.request.userRequest.StudentUpdateRequest;
import com.duokoala.server.dto.response.userResponse.StudentResponse;
import com.duokoala.server.entity.user.Student;
import com.duokoala.server.enums.Role;
import com.duokoala.server.exception.AppException;
import com.duokoala.server.exception.ErrorCode;
import com.duokoala.server.mapper.userMapper.StudentMapper;
import com.duokoala.server.repository.userRepository.StudentRepository;
import com.duokoala.server.repository.userRepository.UserRepository;
import com.duokoala.server.service.AuthenticationService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class StudentService {
    StudentRepository studentRepository;
    StudentMapper studentMapper;
    UserRepository userRepository;
    UserService userService;
    AuthenticationService authenticationService;

    public StudentResponse createStudent(StudentCreationRequest request) {
        Student student = studentMapper.toStudent(request);
        student.setImage(userService.createNewAvatar(request.getImageUrl()));
        student.setRoles(userService.transferRoles(Role.STUDENT.name()));
        student.setDeleted(false);
        student.setFirstLogin(true);
        student.setPassword(userService.encodePassword(request.getPassword()));
        try {
            studentRepository.save(student);
        } catch (DataIntegrityViolationException e) {
            throw new AppException(ErrorCode.USERNAME_EXISTED);
        }
        return studentMapper.toStudentResponse(student);
    }

    public StudentResponse updateStudent(String studentId, StudentUpdateRequest request) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new AppException(ErrorCode.STUDENT_NOT_FOUND));
        studentMapper.updateStudent(student,request);
        userService.updateAvatarByUserId(student.getImage(), request.getImageUrl());
        student.setPassword(userService.encodePassword(request.getPassword()));
        return studentMapper.toStudentResponse(studentRepository.save(student));
    }

    public StudentResponse getStudent(String studentId) {
        var student = studentRepository.findById(studentId)
                .orElseThrow(() -> new AppException(ErrorCode.STUDENT_NOT_FOUND));
        return studentMapper.toStudentResponse(student);
    }

    public StudentResponse getMyInfo() {
        return studentMapper.toStudentResponse(authenticationService.getAuthenticatedStudent());
    }


    public List<StudentResponse> getStudents() {
        var students = studentRepository.findAll();
        return students.stream().map(studentMapper::toStudentResponse).toList();
    }


    public List<StudentResponse> getListByCourseId(String courseId) {
        var students = studentRepository.getListByCourseId(courseId);
        return students.stream().map(studentMapper::toStudentResponse).toList();
    }
}
