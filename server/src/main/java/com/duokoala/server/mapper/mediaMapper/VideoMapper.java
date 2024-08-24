package com.duokoala.server.mapper.mediaMapper;

import com.duokoala.server.dto.request.mediaRequest.VideoCreationRequest;
import com.duokoala.server.dto.request.mediaRequest.VideoUpdateRequest;
import com.duokoala.server.dto.response.mediaResponse.VideoResponse;
import com.duokoala.server.entity.media.Video;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface VideoMapper {
    Video toVideo(VideoCreationRequest request);
    VideoResponse toVideoResponse(Video video);
    void updateVideo(@MappingTarget Video video, VideoUpdateRequest request);
}