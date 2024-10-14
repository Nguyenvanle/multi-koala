package com.duokoala.server.mapper;


import com.duokoala.server.dto.response.favouriteResponse.FavouriteResponse;
import com.duokoala.server.dto.response.favouriteResponse.MyFavouriteResponse;
import com.duokoala.server.entity.Favourite;
import org.mapstruct.Mapper;

@Mapper( componentModel = "spring")// used in spring
public interface FavouriteMapper {
    FavouriteResponse toFavouriteResponse(Favourite favourite);
    MyFavouriteResponse toMyFavouriteResponse(Favourite favourite);
}
