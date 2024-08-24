package com.duokoala.server.controller.mediaController;

import com.duokoala.server.dto.request.mediaRequest.VideoCreationRequest;
import com.duokoala.server.dto.request.mediaRequest.VideoUpdateRequest;
import com.duokoala.server.dto.response.ApiResponse;
import com.duokoala.server.dto.response.mediaResponse.VideoResponse;
import com.duokoala.server.service.mediaService.VideoService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/media/videos")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class VideoController {
    VideoService videoService;

    @PostMapping
    ApiResponse<VideoResponse> createVideo(@RequestBody VideoCreationRequest request) {
        return ApiResponse.<VideoResponse>builder()
                .result(videoService.createVideo(request))
                .build();
    }
    @PutMapping("/{videoId}")
    ApiResponse<VideoResponse> updateVideo(@PathVariable String videoId, @RequestBody VideoUpdateRequest request) {
        return ApiResponse.<VideoResponse>builder()
                .result(videoService.updateVideo(videoId,request))
                .build();
    }
    @GetMapping("/{videoId}")
    ApiResponse<VideoResponse> getVideo(@PathVariable String videoId) {
        return ApiResponse.<VideoResponse>builder()
                .result(videoService.getVideo(videoId))
                .build();
    }

    @GetMapping
    ApiResponse<List<VideoResponse>> getVideos() {
        return ApiResponse.<List<VideoResponse>>builder()
                .result(videoService.getVideos())
                .build();
    }

    @DeleteMapping("/{videoId}")
    ApiResponse<Void> deleteVideo(@PathVariable String videoId) {
        videoService.deleteVideo(videoId);
        return ApiResponse.<Void>builder()
                .message("Video has been deleted!")
                .build();
    }
}
