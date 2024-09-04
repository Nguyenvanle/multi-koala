package com.duokoala.server.mapper;

import com.duokoala.server.dto.request.certificationRequest.CertificationUpdateRequest;
import com.duokoala.server.dto.request.testRequest.TestCreateRequest;
import com.duokoala.server.dto.request.testRequest.TestUpdateRequest;
import com.duokoala.server.dto.response.TestResponse;
import com.duokoala.server.entity.Certification;
import com.duokoala.server.entity.Test;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")// used in spring
public interface TestMapper {
    Test toTest(TestCreateRequest request);
    TestResponse toTestResponse(Test test);
    void updateTest(@MappingTarget Test test, TestUpdateRequest request);
}
