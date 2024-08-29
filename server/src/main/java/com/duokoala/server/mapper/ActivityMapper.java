package com.duokoala.server.mapper;


import com.duokoala.server.dto.request.ActivityCreateRequest;
import com.duokoala.server.dto.response.ActivityResponse;
import com.duokoala.server.entity.Activity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper( componentModel = "spring")// used in spring
public interface ActivityMapper {

    @Mapping(target = "actionedByAdmin", ignore = true)
    @Mapping(target = "happenAt", ignore = true)
    Activity toActivity(ActivityCreateRequest request);
    ActivityResponse toActivityResponse(Activity activity);
}
