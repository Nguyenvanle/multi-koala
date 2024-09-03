package com.duokoala.server.service;

import com.duokoala.server.dto.request.typeRequest.TypeCreateRequest;
import com.duokoala.server.dto.request.typeRequest.TypeUpdateRequest;
import com.duokoala.server.dto.response.TypeResponse;
import com.duokoala.server.entity.Type;
import com.duokoala.server.exception.AppException;
import com.duokoala.server.exception.ErrorCode;
import com.duokoala.server.mapper.TypeMapper;
import com.duokoala.server.repository.TypeRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TypeService {
    TypeRepository typeRepository;
    TypeMapper typeMapper;

    public TypeResponse create(TypeCreateRequest request) {
        if(typeRepository.existsById(request.getTypeName()))
            throw new AppException(ErrorCode.TYPE_EXISTED);

        Type type = typeMapper.toType(request);
        return typeMapper.toTypeResponse(typeRepository.save(type));
    }

    public TypeResponse update(String typeId, TypeUpdateRequest request) {
        var type = typeRepository.findById(typeId)
                .orElseThrow(() -> new AppException(ErrorCode.TYPE_NOT_FOUND));
        typeMapper.updateType(type,request);
        return typeMapper.toTypeResponse(typeRepository.save(type));
    }

    public TypeResponse get(String typeId) {
        return typeMapper.toTypeResponse(typeRepository.findById(typeId)
                .orElseThrow(() -> new AppException(ErrorCode.TYPE_NOT_FOUND)));
    }

    public List<TypeResponse> getAll() {
        var types = typeRepository.findAll();
        return types.stream().map(typeMapper::toTypeResponse).toList();
    }

    public void delete(String typeId) {
        typeRepository.deleteById(typeId);
    }
}
