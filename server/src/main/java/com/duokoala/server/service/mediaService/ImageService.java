package com.duokoala.server.service.mediaService;

import com.duokoala.server.dto.request.mediaRequest.ImageCreationRequest;
import com.duokoala.server.dto.request.mediaRequest.ImageUpdateRequest;
import com.duokoala.server.dto.response.mediaResponse.ImageResponse;
import com.duokoala.server.entity.media.Image;
import com.duokoala.server.exception.AppException;
import com.duokoala.server.exception.ErrorCode;
import com.duokoala.server.mapper.mediaMapper.ImageMapper;
import com.duokoala.server.repository.mediaRepository.ImageRepository;
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
public class ImageService {
    ImageRepository imageRepository;
    ImageMapper imageMapper;

    public ImageResponse createImage(ImageCreationRequest request) {
        Image image = imageMapper.toImage(request);
        image.setImageUrl(request.getImageUrl());
        return imageMapper.toImageResponse(imageRepository.save(image));
    }

    public ImageResponse updateImage(String imageId, ImageUpdateRequest request) {
        Image image = imageRepository.findById(imageId)
                .orElseThrow(() -> new AppException(ErrorCode.IMAGE_NOT_FOUND));
        imageMapper.updateImage(image, request);
        return imageMapper.toImageResponse(imageRepository.save(image));
    }

    public ImageResponse getImage(String imageId) {
        Image image = imageRepository.findById(imageId)
                .orElseThrow(() -> new AppException(ErrorCode.IMAGE_NOT_FOUND));
        return imageMapper.toImageResponse(image);
    }

    public List<ImageResponse> getImages() {
        var images = imageRepository.findAll();
        return images.stream().map(imageMapper::toImageResponse).toList();
    }

    public void deleteImage(String imageId) {
        imageRepository.deleteById(imageId);
    }
}
