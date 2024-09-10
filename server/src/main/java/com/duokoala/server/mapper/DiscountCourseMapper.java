package com.duokoala.server.mapper;


import com.duokoala.server.dto.response.discountCourseResponse.DiscountCourseResponse;
import com.duokoala.server.dto.response.discountCourseResponse.DiscountOnlyResponse;
import com.duokoala.server.entity.DiscountCourse;
import org.mapstruct.Mapper;

@Mapper( componentModel = "spring")// used in spring
public interface DiscountCourseMapper {
    DiscountCourseResponse toDiscountCourseResponse(DiscountCourse discountCourse);
    DiscountOnlyResponse toDiscountOnlyResponse(DiscountCourse discountCourse);
}
