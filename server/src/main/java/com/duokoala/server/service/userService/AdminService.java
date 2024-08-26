package com.duokoala.server.service.userService;

import com.duokoala.server.dto.request.mediaRequest.ImageUpdateRequest;
import com.duokoala.server.dto.request.userRequest.AdminCreationRequest;
import com.duokoala.server.dto.request.userRequest.AdminUpdateRequest;
import com.duokoala.server.dto.response.userResponse.AdminResponse;
import com.duokoala.server.entity.media.Image;
import com.duokoala.server.entity.user.Admin;
import com.duokoala.server.enums.Role;
import com.duokoala.server.exception.AppException;
import com.duokoala.server.exception.ErrorCode;
import com.duokoala.server.mapper.userMapper.AdminMapper;
import com.duokoala.server.repository.userRepository.AdminRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AdminService {
    AdminRepository adminRepository;
    AdminMapper adminMapper;
    UserService userService;


    public AdminResponse createAdmin(AdminCreationRequest request) {
        Admin admin = adminMapper.toAdmin(request);
        admin.setImage(userService.createNewAvatar(request.getImageUrl()));
        admin.setRoles(userService.transferRoles(Role.ADMIN.name()));
        admin.setDeleted(false);
        return adminMapper.toAdminResponse(adminRepository.save(admin));
//        var context = SecurityContextHolder.getContext(); //get current context
//        String name = context.getAuthentication().getName();
//        Admin createByAdmin = adminMapper
    }

    public AdminResponse updateAdmin(String adminId, AdminUpdateRequest request) {
        Admin admin = adminRepository.findById(adminId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        adminMapper.updateAdmin(admin,request);
        userService.updateAvatarByUserId(admin.getImage(), request.getImageUrl());
        return adminMapper.toAdminResponse(adminRepository.save(admin));
    }

    public AdminResponse getAdmin(String adminId) {
        var admin = adminRepository.findById(adminId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        return adminMapper.toAdminResponse(admin);
    }

    public List<AdminResponse> getAdmins() {
        var admins = adminRepository.findAll();
        return admins.stream().map(adminMapper::toAdminResponse).toList();
    }
}
