package com.duokoala.server.service;

import com.duokoala.server.dto.response.favouriteResponse.FavouriteResponse;
import com.duokoala.server.dto.response.favouriteResponse.MyFavouriteResponse;
import com.duokoala.server.entity.Course;
import com.duokoala.server.entity.Favourite;
import com.duokoala.server.entity.user.Student;
import com.duokoala.server.exception.AppException;
import com.duokoala.server.exception.ErrorCode;
import com.duokoala.server.mapper.FavouriteMapper;
import com.duokoala.server.repository.CourseRepository;
import com.duokoala.server.repository.FavouriteRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class FavouriteService {
    FavouriteRepository favouriteRepository;
    FavouriteMapper favouriteMapper;
    AuthenticationService authenticationService;
    CourseRepository courseRepository;

    public FavouriteResponse create(String courseId) {
        Student student = authenticationService.getAuthenticatedStudent();
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND));
        Favourite favourite = Favourite.builder()
                .student(student)
                .course(course)
                .favouriteAt(LocalDateTime.now())
                .build();

        try {
            favouriteRepository.save(favourite);

        } catch(Exception e) {
            throw new AppException(ErrorCode.FAVOURITE_EXISTED);
        }
        return favouriteMapper.toFavouriteResponse(favourite);
    }

    public List<MyFavouriteResponse> getMyFavourites() {
        Student student = authenticationService.getAuthenticatedStudent();
        var favourites = favouriteRepository.findAllByStudent(student);
        return favourites.stream().map(favouriteMapper::toMyFavouriteResponse).toList();
    }

    public void deleteFavourite(String favouriteId) {
        favouriteRepository.deleteById(favouriteId);
    }

    public boolean isMyFavouriteCourse(String courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND));
        Student student = authenticationService.getAuthenticatedStudent();
        Optional<Favourite> favourite = favouriteRepository.findByStudentAndCourse(student,course);
        return favourite.isPresent();
    }

}
