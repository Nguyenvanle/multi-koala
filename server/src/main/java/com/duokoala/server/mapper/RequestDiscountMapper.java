package com.duokoala.server.mapper;

import com.duokoala.server.dto.request.requestDiscountRequest.RequestDiscountCreateRequest;
import com.duokoala.server.dto.request.requestDiscountRequest.RequestDiscountUpdateRequest;
import com.duokoala.server.dto.response.requestDiscountResponse.RequestDiscountOnlyResponse;
import com.duokoala.server.dto.response.requestDiscountResponse.RequestDiscountResponse;
import com.duokoala.server.entity.RequestDiscount;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper( componentModel = "spring")// used in spring
public interface RequestDiscountMapper {
    RequestDiscount toRequestDiscount(RequestDiscountCreateRequest request);
    RequestDiscountResponse toRequestDiscountResponse(RequestDiscount requestDiscount);
    RequestDiscountOnlyResponse toRequestDiscountOnlyResponse(RequestDiscount requestDiscount);
    void updateRequestDiscount(
            @MappingTarget RequestDiscount requestDiscount,
            RequestDiscountUpdateRequest request);
}
