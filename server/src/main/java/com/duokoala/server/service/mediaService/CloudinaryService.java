package com.duokoala.server.service.mediaService;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.duokoala.server.entity.media.Image;
import com.duokoala.server.entity.media.Video;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class CloudinaryService {
    private final Cloudinary cloudinary;

    public CloudinaryService(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    @Transactional
    public Image uploadImage(MultipartFile file) throws IOException {
        Map image = cloudinary.uploader().upload(file.getBytes(),
                ObjectUtils.asMap("resource_type", "image"));
        return Image.builder()
                .imageId((String) image.get("public_id"))
                .imageUrl((String) image.get("secure_url"))
                .build();
    }


    @Transactional
    public List<Image> uploadImages(List<MultipartFile> files) throws IOException {
        return files.stream()
                .map(file -> {
                    try {
                        Map image = cloudinary.uploader().upload(file.getBytes(),
                                ObjectUtils.asMap("resource_type", "image"));

                        return Image.builder()
                                .imageId((String) image.get("public_id"))
                                .imageUrl((String) image.get("secure_url"))
                                .build();
                    } catch (IOException e) {
                        throw new RuntimeException("Error uploading file: " + file.getOriginalFilename(), e);
                    }
                }).toList();
    }

    @Transactional
    public Video uploadVideo(MultipartFile file) throws IOException {
        var video = cloudinary.uploader().upload(file.getBytes(),
                ObjectUtils.asMap(
                        "resource_type", "video"));
        return Video.builder()
                .videoId((String) video.get("public_id"))
                .videoUrl((String) video.get("secure_url"))
                .videoDuration((double) video.get("duration"))
                .build();
    }

    @Transactional
    public void deleteImage(String publicId) {
            try {
                cloudinary.uploader().destroy(publicId, ObjectUtils.asMap(
                        "resource_type", "image"));
            } catch (Exception e) {
                log.error("Error deleting file: {}", publicId, e);
            }
        }

    @Transactional
    public void deleteVideo(String publicId) {
        try {
            cloudinary.uploader().destroy(publicId, ObjectUtils.asMap(
                    "resource_type", "video"));
        } catch (Exception e) {
            log.error("Error deleting file: {}", publicId, e);
        }
    }

}
