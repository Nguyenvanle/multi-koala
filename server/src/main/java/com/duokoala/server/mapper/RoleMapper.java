package com.duokoala.server.mapper;

import com.duokoala.server.dto.request.RoleRequest;
import com.duokoala.server.dto.response.RoleResponse;
import com.duokoala.server.entity.Role;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;


@Mapper( componentModel = "spring")// used in spring
public interface RoleMapper {
    @Mapping(target = "permissions", ignore = true)// can't map string to permission, skip this property
    Role toRole(RoleRequest request);
    RoleResponse toRoleResponse(Role request);

}
