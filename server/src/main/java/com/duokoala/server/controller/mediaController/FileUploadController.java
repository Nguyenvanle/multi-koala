package com.duokoala.server.controller.mediaController;

import com.duokoala.server.dto.response.ApiResponse;
import com.duokoala.server.service.mediaService.CloudinaryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/files")
public class FileUploadController {
    private final CloudinaryService cloudinaryService;

    public FileUploadController(CloudinaryService cloudinaryService) {
        this.cloudinaryService = cloudinaryService;
    }

    @PostMapping("/upload/images")
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file)
            throws IOException {
        return ResponseEntity.ok(cloudinaryService.uploadImage(file));
    }

    @PostMapping("/upload/videos")
    public ResponseEntity<?> uploadVideo(@RequestParam("file") MultipartFile file)
            throws IOException {
        return ResponseEntity.ok(cloudinaryService.uploadVideo(file));
    }

    @DeleteMapping("/images/{imageId}")
    public ApiResponse<Void> deleteImage(@PathVariable String imageId) {
        cloudinaryService.deleteImage(imageId);
        return ApiResponse.<Void>builder()
                .message("Image has been deleted")
                .build();
    }
}
