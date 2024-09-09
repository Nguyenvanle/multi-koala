package com.duokoala.server.service;

import com.duokoala.server.dto.request.referenceRequest.ReferenceCreateRequest;
import com.duokoala.server.dto.request.referenceRequest.ReferenceUpdateRequest;
import com.duokoala.server.dto.response.ReferenceResponse;
import com.duokoala.server.entity.Reference;
import com.duokoala.server.exception.AppException;
import com.duokoala.server.exception.ErrorCode;
import com.duokoala.server.mapper.ReferenceMapper;
import com.duokoala.server.repository.ReferenceRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ReferenceService {
    ReferenceRepository referenceRepository;
    ReferenceMapper referenceMapper;
    AuthenticationService authenticationService;

    public ReferenceResponse create(ReferenceCreateRequest request) {
        Reference reference = referenceMapper.toReference(request);
        reference.setStudent(authenticationService.getAuthenticatedStudent());
        reference.setTakenDate(LocalDateTime.now());
        return referenceMapper.toReferenceResponse(referenceRepository.save(reference));
    }

    public ReferenceResponse update(String referenceId, ReferenceUpdateRequest request) {
        Reference reference = referenceRepository.findById(referenceId)
                .orElseThrow(() -> new AppException(ErrorCode.REFERENCE_NOT_FOUND));
        referenceMapper.updateReference(reference,request);
        reference.setTakenDate(LocalDateTime.now());
        return referenceMapper.toReferenceResponse(referenceRepository.save(reference));
    }

    public ReferenceResponse get(String referenceId) {
        return referenceMapper.toReferenceResponse(referenceRepository.findById(referenceId)
                .orElseThrow(() -> new AppException(ErrorCode.REFERENCE_NOT_FOUND)));
    }

    public List<ReferenceResponse> getAll() {
        var references = referenceRepository.findAll();
        return references.stream().map(referenceMapper::toReferenceResponse).toList();
    }

    public void delete(String referenceId) {
        referenceRepository.deleteById(referenceId);
    }
}
