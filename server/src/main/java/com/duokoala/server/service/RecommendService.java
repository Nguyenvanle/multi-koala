package com.duokoala.server.service;

import com.duokoala.server.dto.request.recommendRequest.RecommendCreateRequest;
import com.duokoala.server.dto.request.recommendRequest.RecommendUpdateRequest;
import com.duokoala.server.dto.response.RecommendResponse;
import com.duokoala.server.entity.Recommend;
import com.duokoala.server.exception.AppException;
import com.duokoala.server.exception.ErrorCode;
import com.duokoala.server.mapper.RecommendMapper;
import com.duokoala.server.repository.FieldRepository;
import com.duokoala.server.repository.RecommendRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RecommendService {
    RecommendRepository referenceRepository;
    RecommendMapper recommendMapper;
    AuthenticationService authenticationService;
    FieldRepository fieldRepository;

    public RecommendResponse create(RecommendCreateRequest request) {
        Recommend recommend = recommendMapper.toRecommend(request);
        var student = authenticationService.getAuthenticatedStudent();
        if (referenceRepository.existsByStudent(student))
            throw new AppException(ErrorCode.REFERENCE_EXISTED);
        recommend.setStudent(student);
        recommend.setTakenDate(LocalDateTime.now());
        var fields = fieldRepository.findAllById(request.getFavoriteFields());
        recommend.setFavoriteFields(new HashSet<>(fields));
        return recommendMapper.toRecommendResponse(referenceRepository.save(recommend));
    }

    public RecommendResponse update(String referenceId, RecommendUpdateRequest request) {
        Recommend recommend = referenceRepository.findById(referenceId)
                .orElseThrow(() -> new AppException(ErrorCode.REFERENCE_NOT_FOUND));
        recommendMapper.updateRecommend(recommend, request);
        var fields = fieldRepository.findAllById(request.getFavoriteFields());
        recommend.setFavoriteFields(new HashSet<>(fields));
        recommend.setTakenDate(LocalDateTime.now());
        return recommendMapper.toRecommendResponse(referenceRepository.save(recommend));
    }

    public RecommendResponse get(String referenceId) {
        return recommendMapper.toRecommendResponse(referenceRepository.findById(referenceId)
                .orElseThrow(() -> new AppException(ErrorCode.REFERENCE_NOT_FOUND)));
    }

    public List<RecommendResponse> getAll() {
        var references = referenceRepository.findAll();
        return references.stream().map(recommendMapper::toRecommendResponse).toList();
    }

    public void delete(String referenceId) {
        referenceRepository.deleteById(referenceId);
    }
}
