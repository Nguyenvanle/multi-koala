package com.duokoala.server.controller;

import com.duokoala.server.dto.response.ApiResponse;
import com.duokoala.server.dto.response.favouriteResponse.FavouriteResponse;
import com.duokoala.server.dto.response.favouriteResponse.MyFavouriteResponse;
import com.duokoala.server.service.FavouriteService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class FavouriteController {
    FavouriteService favouriteService;

    @PostMapping("/courses/{courseId}/favourites")
    ApiResponse<FavouriteResponse> create(@PathVariable String courseId) {
        return ApiResponse.<FavouriteResponse>builder()
                .result(favouriteService.create(courseId))
                .build();
    }

    @PostMapping("/courses/{courseId}/favourite-check")
    ApiResponse<Boolean> isMyFavouriteCourse(@PathVariable String courseId) {
        return ApiResponse.<Boolean>builder()
                .result(favouriteService.isMyFavouriteCourse(courseId))
                .build();
    }


    @GetMapping("/favourites/my-favourites")
    ApiResponse<List<MyFavouriteResponse>> getMy() {
        return ApiResponse.<List<MyFavouriteResponse>>builder()
                .result(favouriteService.getMyFavourites())
                .build();
    }
    @DeleteMapping("/favourites/{favouriteId}")
    ApiResponse<Void> deleteFavourite(@PathVariable String favouriteId) {
        favouriteService.deleteFavourite(favouriteId);
        return ApiResponse.<Void>builder()
                .message("Favourite has been deleted!")
                .build();
    }

}
