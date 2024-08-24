package com.duokoala.server.controller.mediaController;

import com.duokoala.server.dto.request.mediaRequest.ImageCreateRequest;
import com.duokoala.server.dto.request.mediaRequest.ImageUpdateRequest;
import com.duokoala.server.dto.response.ApiResponse;
import com.duokoala.server.dto.response.mediaResponse.ImageResponse;
import com.duokoala.server.service.mediaService.ImageService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/media/images")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ImageController {
    ImageService imageService;

    @PostMapping
    ApiResponse<ImageResponse> createImage(@RequestBody ImageCreateRequest request) {
        return ApiResponse.<ImageResponse>builder()
                .result(imageService.createImage(request))
                .build();
    }
    @PutMapping("/{imageId}")
    ApiResponse<ImageResponse> updateImage(@PathVariable String imageId, @RequestBody ImageUpdateRequest request) {
        return ApiResponse.<ImageResponse>builder()
                .result(imageService.updateImage(imageId,request))
                .build();
    }
    @GetMapping("/{imageId}")
    ApiResponse<ImageResponse> getImage(@PathVariable String imageId) {
        return ApiResponse.<ImageResponse>builder()
                .result(imageService.getImage(imageId))
                .build();
    }

    @GetMapping
    ApiResponse<List<ImageResponse>> getImages() {
        return ApiResponse.<List<ImageResponse>>builder()
                .result(imageService.getImages())
                .build();
    }

    @DeleteMapping("/{imageId}")
    ApiResponse<Void> deleteImage(@PathVariable String imageId) {
        imageService.deleteImage(imageId);
        return ApiResponse.<Void>builder()
                .message("Image has been deleted!")
                .build();
    }
}
