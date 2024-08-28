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
}
