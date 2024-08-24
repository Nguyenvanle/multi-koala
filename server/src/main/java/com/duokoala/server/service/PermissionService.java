package com.duokoala.server.service;

import com.duokoala.server.dto.request.PermissionRequest;
import com.duokoala.server.dto.response.PermissionResponse;
import com.duokoala.server.entity.Permission;
import com.duokoala.server.mapper.PermissionMapper;
import com.duokoala.server.repository.PermissionRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PermissionService {
    PermissionRepository permissionRepository;
    PermissionMapper permissionMapper;

    public PermissionResponse create(PermissionRequest request) {
        Permission permission = permissionMapper.toPermission(request);
        permission = permissionRepository.save(permission);
        return permissionMapper.toPermissionResponse(permission);
    }

    public List<PermissionResponse> getAll() {
        var permissions = permissionRepository.findAll(); //get list permissions
        return permissions.stream().map(permissionMapper::toPermissionResponse).toList();
        //change permission into permission response
        //finally chang it to list
    }

    public void delete(String permission) {
        permissionRepository.deleteById(permission);
    }
}
