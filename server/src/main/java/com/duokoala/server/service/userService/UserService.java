package com.duokoala.server.service.userService;

import com.duokoala.server.dto.request.authRequest.LoginRequest;
import com.duokoala.server.dto.request.mediaRequest.ImageCreationRequest;
import com.duokoala.server.dto.request.mediaRequest.ImageUpdateRequest;
import com.duokoala.server.dto.response.authResponse.AuthenticationResponse;
import com.duokoala.server.dto.response.courseResponse.CourseResponse;
import com.duokoala.server.dto.response.userResponse.UserResponse;
import com.duokoala.server.entity.Course;
import com.duokoala.server.entity.Role;
import com.duokoala.server.entity.media.Image;
import com.duokoala.server.entity.user.User;
import com.duokoala.server.exception.AppException;
import com.duokoala.server.exception.ErrorCode;
import com.duokoala.server.mapper.mediaMapper.ImageMapper;
import com.duokoala.server.mapper.userMapper.UserMapper;
import com.duokoala.server.repository.RoleRepository;
import com.duokoala.server.repository.mediaRepository.ImageRepository;
import com.duokoala.server.repository.userRepository.UserRepository;
import com.duokoala.server.service.AuthenticationService;
//import com.duokoala.server.service.EmailService;
import com.duokoala.server.service.EmailService;
import com.duokoala.server.service.mediaService.CloudinaryService;
import com.nimbusds.jose.JOSEException;
import jakarta.mail.MessagingException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
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
    ImageRepository imageRepository;
    ImageMapper imageMapper;
    PasswordEncoder passwordEncoder;
    CloudinaryService cloudinaryService;
    UserMapper userMapper;

    public String encodePassword(String password) {
        return passwordEncoder.encode(password);
    }

    public Image createNewAvatar(String imageUrl) {
        Image image = imageMapper.toImage(
                ImageCreationRequest.builder()
                        .imageUrl(imageUrl)
                        .build());
        return imageRepository.save(image);
    }

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
