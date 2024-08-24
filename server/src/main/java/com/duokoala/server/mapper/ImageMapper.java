package com.duokoala.server.mapper;

import com.duokoala.server.dto.request.mediaRequest.ImageCreateRequest;
import com.duokoala.server.dto.request.mediaRequest.ImageUpdateRequest;
import com.duokoala.server.dto.response.mediaResponse.ImageResponse;
import com.duokoala.server.entity.media.Image;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ImageMapper {
    Image toImage(ImageCreateRequest request);
    ImageResponse toImageResponse(Image image);
    void updateImage(@MappingTarget Image image, ImageUpdateRequest request);
}