package com.duokoala.server.service.mediaService;

import com.duokoala.server.dto.request.mediaRequest.VideoCreateRequest;
import com.duokoala.server.dto.request.mediaRequest.VideoUpdateRequest;
import com.duokoala.server.dto.response.mediaResponse.VideoResponse;
import com.duokoala.server.entity.media.Video;
import com.duokoala.server.exception.AppException;
import com.duokoala.server.exception.ErrorCode;
import com.duokoala.server.mapper.VideoMapper;
import com.duokoala.server.repository.mediaRepository.VideoRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class VideoService {
    VideoRepository videoRepository;
    VideoMapper videoMapper;

    public VideoResponse createVideo(VideoCreateRequest request) {
        Video video = videoMapper.toVideo(request);
        return videoMapper.toVideoResponse(videoRepository.save(video));
    }

    public VideoResponse updateVideo(String videoId, VideoUpdateRequest request) {
        Video video = videoRepository.findById(videoId)
                .orElseThrow(() -> new AppException(ErrorCode.VIDEO_NOT_EXISTED));
        videoMapper.updateVideo(video,request);
        return videoMapper.toVideoResponse(videoRepository.save(video));
    }

    public VideoResponse getVideo(String videoId) {
        Video video = videoRepository.findById(videoId)
                .orElseThrow(() -> new AppException(ErrorCode.VIDEO_NOT_EXISTED));
        return videoMapper.toVideoResponse(video);
    }

    public List<VideoResponse> getVideos() {
        var videos = videoRepository.findAll();
        return videos.stream().map(videoMapper::toVideoResponse).toList();
    }

    public void deleteVideo(String videoId) {
        videoRepository.deleteById(videoId);
    }
}
