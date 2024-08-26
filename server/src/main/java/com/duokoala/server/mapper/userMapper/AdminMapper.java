package com.duokoala.server.mapper.userMapper;

import com.duokoala.server.dto.request.userRequest.AdminCreationRequest;
import com.duokoala.server.dto.request.userRequest.AdminUpdateRequest;
import com.duokoala.server.dto.response.userResponse.AdminResponse;
import com.duokoala.server.entity.user.Admin;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface AdminMapper {
    @Mapping(target = "createByAdmin", ignore = true)
    @Mapping(target = "image", ignore = true)
    @Mapping(target = "roles", ignore = true)
    Admin toAdmin(AdminCreationRequest request);
    AdminResponse toAdminResponse(Admin admin);
    @Mapping(target = "image", ignore = true)
    void updateAdmin(@MappingTarget Admin admin, AdminUpdateRequest request);
}
