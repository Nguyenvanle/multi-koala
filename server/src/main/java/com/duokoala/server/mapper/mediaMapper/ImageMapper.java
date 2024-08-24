package com.duokoala.server.mapper.mediaMapper;

import com.duokoala.server.dto.request.mediaRequest.ImageCreationRequest;
import com.duokoala.server.dto.request.mediaRequest.ImageUpdateRequest;
import com.duokoala.server.dto.response.mediaResponse.ImageResponse;
import com.duokoala.server.entity.media.Image;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ImageMapper {
    Image toImage(ImageCreationRequest request);
    ImageResponse toImageResponse(Image image);
    void updateImage(@MappingTarget Image image, ImageUpdateRequest request);
}