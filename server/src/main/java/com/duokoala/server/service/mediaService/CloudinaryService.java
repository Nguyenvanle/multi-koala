package com.duokoala.server.service.mediaService;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.duokoala.server.entity.media.Image;
import com.duokoala.server.entity.media.Video;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

@Service
public class CloudinaryService {
    private final Cloudinary cloudinary;
    String IMAGE_FOLDER = "images";
    String VIDEO_FOLDER = "videos";

    public CloudinaryService(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    @Transactional
    public Image uploadImage(MultipartFile file) throws IOException {
        var image = cloudinary.uploader().upload(file.getBytes(),
                ObjectUtils.asMap(
                        "folder", IMAGE_FOLDER
                ));
        return Image.builder()
                .imageUrl((String) image.get("secure_url"))
                .build();
    }

    @Transactional
    public Video uploadVideo(MultipartFile file) throws IOException {
        var video = cloudinary.uploader().upload(file.getBytes(),
                ObjectUtils.asMap(
                        "resource_type", "video",
                        "folder", VIDEO_FOLDER
                ));
        return Video.builder()
                .videoUrl((String) video.get("secure_url"))
                .videoDuration((double) video.get("duration"))
                .build();
    }
}
