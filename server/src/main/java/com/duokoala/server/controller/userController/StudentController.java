package com.duokoala.server.controller.userController;

import com.duokoala.server.dto.request.userRequest.StudentCreationRequest;
import com.duokoala.server.dto.request.userRequest.StudentUpdateRequest;
import com.duokoala.server.dto.response.ApiResponse;
import com.duokoala.server.dto.response.userResponse.StudentResponse;
import com.duokoala.server.service.userService.StudentService;
import com.duokoala.server.service.userService.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
@Slf4j
public class StudentController {
    StudentService studentService;
    UserService userService;

    @PostMapping
    ApiResponse<StudentResponse> createStudent(@RequestBody StudentCreationRequest request) {
        return ApiResponse.<StudentResponse>builder()
                .result(studentService.createStudent(request))
                .build();
    }

    @PutMapping("/{studentId}")
    ApiResponse<StudentResponse> updateStudent(
            @PathVariable String studentId, @RequestBody StudentUpdateRequest request) {
        return ApiResponse.<StudentResponse>builder()
                .result(studentService.updateStudent(studentId,request))
                .build();
    }

    @GetMapping("/{studentId}")
    ApiResponse<StudentResponse> getStudent(@PathVariable String studentId) {
        return ApiResponse.<StudentResponse>builder()
                .result(studentService.getStudent(studentId))
                .build();
    }

    @GetMapping
    ApiResponse<List<StudentResponse>> getStudents() {
        return ApiResponse.<List<StudentResponse>>builder()
                .result(studentService.getStudents())
                .build();
    }

    @DeleteMapping("/{studentId}")
    ApiResponse<Void> deleteStudent(@PathVariable String studentId) {
        userService.deleteUser(studentId);
        return ApiResponse.<Void>builder()
                .message("Student has been deleted!")
                .build();
    }
}
