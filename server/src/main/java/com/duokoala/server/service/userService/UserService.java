package com.duokoala.server.service.userService;

import com.duokoala.server.dto.request.userRequest.ChangePasswordRequest;
import com.duokoala.server.dto.response.userResponse.UserResponse;
import com.duokoala.server.entity.Role;
import com.duokoala.server.entity.user.User;
import com.duokoala.server.exception.AppException;
import com.duokoala.server.exception.ErrorCode;
import com.duokoala.server.mapper.userMapper.UserMapper;
import com.duokoala.server.repository.RoleRepository;
import com.duokoala.server.repository.userRepository.UserRepository;
import com.duokoala.server.service.AuthenticationService;
import com.duokoala.server.service.mediaService.CloudinaryService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashSet;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserService {
    UserRepository userRepository;
    RoleRepository roleRepository;
    PasswordEncoder passwordEncoder;
    CloudinaryService cloudinaryService;
    UserMapper userMapper;
    AuthenticationService authenticationService;

    public String encodePassword(String password) {
        return passwordEncoder.encode(password);
    }

    public UserResponse changeMyPassword(ChangePasswordRequest request) {
        User user = authenticationService.getAuthenticatedUser();
        if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword()))
            throw new AppException(ErrorCode.INVALID_PASSWORD);
        user.setPassword(encodePassword(request.getNewPassword()));
        return userMapper.toUserResponse(userRepository.save(user));
    }

    @Transactional
    public UserResponse uploadImage(String userId, MultipartFile imageFile) throws IOException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        if (user.getImage() != null) cloudinaryService.deleteImage(user.getImage().getImageId());
        user.setImage(cloudinaryService.uploadImage(imageFile));
        return userMapper.toUserResponse(userRepository.save(user));
    }

    public HashSet<Role> transferRoles(String role) {
        HashSet<Role> roles = new HashSet<>();
        roles.add(roleRepository.findById(role)
                .orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_FOUND)));
        return roles;
    }

    public void deleteUser(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        user.setDeleted(true);
        userRepository.save(user);
    }
}
