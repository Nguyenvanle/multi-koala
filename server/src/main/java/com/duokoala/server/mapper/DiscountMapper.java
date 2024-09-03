package com.duokoala.server.mapper;


import com.duokoala.server.dto.request.discountRequest.DiscountCreateRequest;
import com.duokoala.server.dto.request.discountRequest.DiscountUpdateRequest;
import com.duokoala.server.dto.response.DiscountResponse;
import com.duokoala.server.entity.Discount;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper( componentModel = "spring")// used in spring
public interface DiscountMapper {
    @Mapping(target = "createdByAdmin", ignore = true)
    Discount toDiscount(DiscountCreateRequest request);
    DiscountResponse toDiscountResponse(Discount discount);
    void updateDiscount(@MappingTarget Discount discount, DiscountUpdateRequest request);
}
