package com.duokoala.server.mapper.userMapper;

import com.duokoala.server.dto.response.userResponse.UserResponse;
import com.duokoala.server.entity.user.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserResponse toUserResponse(User user);
}
