package com.duokoala.server.mapper;

import com.duokoala.server.dto.request.PermissionRequest;
import com.duokoala.server.dto.response.PermissionResponse;
import com.duokoala.server.entity.Permission;
import org.mapstruct.Mapper;

@Mapper( componentModel = "spring")// used in spring
public interface PermissionMapper {
    Permission toPermission(PermissionRequest request);
    PermissionResponse toPermissionResponse(Permission permission);

}
