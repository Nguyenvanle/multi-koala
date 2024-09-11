package com.duokoala.server.service.userService;

import com.duokoala.server.dto.request.userRequest.AdminCreationRequest;
import com.duokoala.server.dto.request.userRequest.AdminUpdateRequest;
import com.duokoala.server.dto.response.userResponse.AdminResponse;
import com.duokoala.server.entity.user.Admin;
import com.duokoala.server.enums.Role;
import com.duokoala.server.exception.AppException;
import com.duokoala.server.exception.ErrorCode;
import com.duokoala.server.mapper.userMapper.AdminMapper;
import com.duokoala.server.repository.userRepository.AdminRepository;
import com.duokoala.server.repository.userRepository.UserRepository;
import com.duokoala.server.service.AuthenticationService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AdminService {
    AdminRepository adminRepository;
    UserRepository userRepository;
    AdminMapper adminMapper;
    UserService userService;
    AuthenticationService authenticationService;

    public AdminResponse createAdmin(AdminCreationRequest request) {
        if(userRepository.existsByUsername(request.getUsername()))
            throw new AppException(ErrorCode.USERNAME_EXISTED);
        Admin admin = adminMapper.toAdmin(request);

        admin.setImage(userService.createNewAvatar(request.getImageUrl()));
        admin.setRoles(userService.transferRoles(Role.ADMIN.name()));
        admin.setDeleted(false);
        admin.setPassword(userService.encodePassword(request.getPassword()));
        admin.setCreateByAdmin(authenticationService.getAuthenticatedAdmin());
        return adminMapper.toAdminResponse(adminRepository.save(admin));
    }

    public AdminResponse updateAdmin(String adminId, AdminUpdateRequest request) {
        Admin admin = adminRepository.findById(adminId)
                .orElseThrow(() -> new AppException(ErrorCode.ADMIN_NOT_FOUND));
        adminMapper.updateAdmin(admin,request);
        userService.updateAvatarByUserId(admin.getImage(), request.getImageUrl());
        admin.setPassword(userService.encodePassword(request.getPassword()));
        return adminMapper.toAdminResponse(adminRepository.save(admin));
    }

    public AdminResponse getAdmin(String adminId) {
        var admin = adminRepository.findById(adminId)
                .orElseThrow(() -> new AppException(ErrorCode.ADMIN_NOT_FOUND));
        return adminMapper.toAdminResponse(admin);
    }

    public AdminResponse getMyInfo() {
        return adminMapper.toAdminResponse(authenticationService.getAuthenticatedAdmin());
    }

    @PreAuthorize("hasAuthority('GET_ALL_USER')")
    public List<AdminResponse> getAdmins() {
        var admins = adminRepository.findAll();
        return admins.stream().map(adminMapper::toAdminResponse).toList();
    }
}
