package com.duokoala.server.controller.userController;

import com.duokoala.server.dto.request.userRequest.TeacherCreationRequest;
import com.duokoala.server.dto.request.userRequest.TeacherUpdateRequest;
import com.duokoala.server.dto.response.ApiResponse;
import com.duokoala.server.dto.response.userResponse.teacherResponse.StatisticTeacherResponse;
import com.duokoala.server.dto.response.userResponse.teacherResponse.TeacherResponse;
import com.duokoala.server.service.userService.TeacherService;
import com.duokoala.server.service.userService.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/teachers")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
@Slf4j
public class TeacherController {
    TeacherService teacherService;
    UserService userService;

    @PostMapping
    ApiResponse<TeacherResponse> createTeacher(@RequestBody TeacherCreationRequest request) {
        return ApiResponse.<TeacherResponse>builder()
                .result(teacherService.createTeacher(request))
                .build();
    }

    @PutMapping("/{teacherId}")
    ApiResponse<TeacherResponse> updateTeacher(
            @PathVariable String teacherId, @RequestBody TeacherUpdateRequest request) {
        return ApiResponse.<TeacherResponse>builder()
                .result(teacherService.updateTeacher(teacherId,request))
                .build();
    }

    @GetMapping("/{teacherId}")
    ApiResponse<TeacherResponse> getTeacher(@PathVariable String teacherId) {
        return ApiResponse.<TeacherResponse>builder()
                .result(teacherService.getTeacher(teacherId))
                .build();
    }

    @GetMapping("/me")
    ApiResponse<TeacherResponse> getMyInfo() {
        return ApiResponse.<TeacherResponse>builder()
                .result(teacherService.getMyInfo())
                .build();
    }

    @GetMapping
    ApiResponse<List<TeacherResponse>> getTeachers() {
        return ApiResponse.<List<TeacherResponse>>builder()
                .result(teacherService.getTeachers())
                .build();
    }
    @GetMapping("/my-statistic")
    ApiResponse<StatisticTeacherResponse> getStatisticTeacher() {
        return ApiResponse.<StatisticTeacherResponse>builder()
                .result(teacherService.getStatisticTeacher())
                .build();
    }

    @DeleteMapping("/{teacherId}")
    ApiResponse<Void> deleteTeacher(@PathVariable String teacherId) {
        userService.deleteUser(teacherId);
        return ApiResponse.<Void>builder()
                .message("Teacher has been deleted!")
                .build();
    }
}
