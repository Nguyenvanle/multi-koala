package com.duokoala.server.mapper;

import com.duokoala.server.dto.request.mediaRequest.ImageUpdateRequest;
import com.duokoala.server.dto.request.mediaRequest.VideoCreateRequest;
import com.duokoala.server.dto.request.mediaRequest.VideoUpdateRequest;
import com.duokoala.server.dto.response.mediaResponse.VideoResponse;
import com.duokoala.server.entity.media.Image;
import com.duokoala.server.entity.media.Video;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface VideoMapper {
    Video toVideo(VideoCreateRequest request);
    VideoResponse toVideoResponse(Video video);
    void updateVideo(@MappingTarget Video video, VideoUpdateRequest request);
}