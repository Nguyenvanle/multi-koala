package com.duokoala.server.service.userService;

import com.duokoala.server.dto.request.mediaRequest.ImageCreationRequest;
import com.duokoala.server.dto.request.mediaRequest.ImageUpdateRequest;
import com.duokoala.server.entity.Role;
import com.duokoala.server.entity.media.Image;
import com.duokoala.server.entity.user.User;
import com.duokoala.server.exception.AppException;
import com.duokoala.server.exception.ErrorCode;
import com.duokoala.server.mapper.mediaMapper.ImageMapper;
import com.duokoala.server.repository.RoleRepository;
import com.duokoala.server.repository.mediaRepository.ImageRepository;
import com.duokoala.server.repository.userRepository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashSet;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserService {
    private final RoleRepository roleRepository;
    ImageRepository imageRepository;
    ImageMapper imageMapper;

    public Image createNewAvatar(String imageUrl) {
        Image image = imageMapper.toImage(
                ImageCreationRequest.builder()
                        .imageUrl(imageUrl)
                        .build());
        return imageRepository.save(image);
    }

    public void updateAvatarByUserId(Image image, String imageUrl) {
        if(image == null) return;
        imageMapper.updateImage(image,
                ImageUpdateRequest.builder()
                        .imageUrl(imageUrl)
                        .build());
        imageRepository.save(image);
    }

    public HashSet<Role> transferRoles(String role) {
        HashSet<Role> roles = new HashSet<>();
        roles.add(roleRepository.findById(role)
                .orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_EXISTED)));
        return roles;
    }
}
