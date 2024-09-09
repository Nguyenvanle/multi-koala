package com.duokoala.server.service;

import com.duokoala.server.dto.request.fieldRequest.FieldCreateRequest;
import com.duokoala.server.dto.request.fieldRequest.FieldUpdateRequest;
import com.duokoala.server.dto.response.FieldResponse;
import com.duokoala.server.entity.Field;
import com.duokoala.server.exception.AppException;
import com.duokoala.server.exception.ErrorCode;
import com.duokoala.server.mapper.FieldMapper;
import com.duokoala.server.repository.FieldRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class FieldService {
    FieldRepository fieldRepository;
    FieldMapper fieldMapper;

    public FieldResponse create(FieldCreateRequest request) {
        if(fieldRepository.existsById(request.getFieldName()))
            throw new AppException(ErrorCode.FIELD_EXISTED);
        Field field = fieldMapper.toField(request);
        return fieldMapper.toFieldResponse(fieldRepository.save(field));
    }

    public FieldResponse update(String fieldId, FieldUpdateRequest request) {
        var field = fieldRepository.findById(fieldId)
                .orElseThrow(() -> new AppException(ErrorCode.FIELD_NOT_FOUND));
        fieldMapper.updateField(field,request);
        return fieldMapper.toFieldResponse(fieldRepository.save(field));
    }

    public FieldResponse get(String fieldId) {
        return fieldMapper.toFieldResponse(fieldRepository.findById(fieldId)
                .orElseThrow(() -> new AppException(ErrorCode.FIELD_NOT_FOUND)));
    }

    public List<FieldResponse> getAll() {
        var fields = fieldRepository.findAll();
        return fields.stream().map(fieldMapper::toFieldResponse).toList();
    }

    public void delete(String fieldId) {
        fieldRepository.deleteById(fieldId);
    }
}
