package com.duokoala.server.mapper;


import com.duokoala.server.dto.request.recommendRequest.RecommendCreateRequest;
import com.duokoala.server.dto.request.recommendRequest.RecommendUpdateRequest;
import com.duokoala.server.dto.response.RecommendResponse;
import com.duokoala.server.entity.Recommend;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper( componentModel = "spring")// used in spring
public interface RecommendMapper {
    @Mapping(target = "favoriteFields", ignore = true)
    Recommend toRecommend(RecommendCreateRequest request);
    RecommendResponse toRecommendResponse(Recommend recommend);
    @Mapping(target = "favoriteFields", ignore = true)
    void updateRecommend(@MappingTarget Recommend recommend, RecommendUpdateRequest request);
}
