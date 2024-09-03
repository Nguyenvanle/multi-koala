package com.duokoala.server.service;

import com.duokoala.server.dto.request.discountRequest.DiscountCreateRequest;
import com.duokoala.server.dto.request.discountRequest.DiscountUpdateRequest;
import com.duokoala.server.dto.response.DiscountResponse;
import com.duokoala.server.entity.Discount;
import com.duokoala.server.exception.AppException;
import com.duokoala.server.exception.ErrorCode;
import com.duokoala.server.mapper.DiscountMapper;
import com.duokoala.server.repository.DiscountRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DiscountService {
    DiscountRepository discountRepository;
    DiscountMapper discountMapper;
    AuthenticationService authenticationService;

    public DiscountResponse create(DiscountCreateRequest request) {
        Discount discount = discountMapper.toDiscount(request);
        discount.setCreatedByAdmin(authenticationService.getAuthenticatedAdmin());
        return discountMapper.toDiscountResponse(discountRepository.save(discount));
    }

    public DiscountResponse update(String discountId, DiscountUpdateRequest request) {
        var discount = discountRepository.findById(discountId)
                .orElseThrow(() -> new AppException(ErrorCode.DISCOUNT_NOT_FOUND));
        discountMapper.updateDiscount(discount,request);
        return discountMapper.toDiscountResponse(discountRepository.save(discount));
    }

    public DiscountResponse get(String discountId) {
        return discountMapper.toDiscountResponse(discountRepository.findById(discountId)
                .orElseThrow(() -> new AppException(ErrorCode.DISCOUNT_NOT_FOUND)));
    }

    public List<DiscountResponse> getAll() {
        var discounts = discountRepository.findAll();
        return discounts.stream().map(discountMapper::toDiscountResponse).toList();
    }

    public void delete(String discountId) {
        discountRepository.deleteById(discountId);
    }
}
