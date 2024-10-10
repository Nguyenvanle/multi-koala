package com.duokoala.server.controller.mediaController;

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

    @PostMapping("/upload/image")
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file)
            throws IOException {
        return ResponseEntity.ok(cloudinaryService.uploadImage(file));
    }

    @PostMapping("/upload/video")
    public ResponseEntity<?> uploadVideo(@RequestParam("file") MultipartFile file)
            throws IOException {
        return ResponseEntity.ok(cloudinaryService.uploadVideo(file));
    }
}
