package com.duokoala.server.service;

import com.duokoala.server.dto.request.courseRequest.CourseApproveRequest;
import com.duokoala.server.dto.request.courseRequest.CourseCreateRequest;
import com.duokoala.server.dto.request.courseRequest.CourseUpdateRequest;
import com.duokoala.server.dto.response.FieldResponse;
import com.duokoala.server.dto.response.TypeResponse;
import com.duokoala.server.dto.response.analysis.courseAnalysisResponse.PerformingCourseResponse;
import com.duokoala.server.dto.response.analysis.courseAnalysisResponse.StatisticCourseResponse;
import com.duokoala.server.dto.response.courseResponse.CoursePriceResponse;
import com.duokoala.server.dto.response.courseResponse.CourseResponse;
import com.duokoala.server.dto.response.courseResponse.DiscountAppliedResponse;
import com.duokoala.server.entity.Course;
import com.duokoala.server.entity.EnrollCourse;
import com.duokoala.server.entity.Field;
import com.duokoala.server.entity.Type;
import com.duokoala.server.entity.user.Student;
import com.duokoala.server.enums.courseEnums.Level;
import com.duokoala.server.enums.courseEnums.Status;
import com.duokoala.server.exception.AppException;
import com.duokoala.server.exception.ErrorCode;
import com.duokoala.server.mapper.CourseMapper;
import com.duokoala.server.repository.*;
import com.duokoala.server.service.mediaService.CloudinaryService;
import com.duokoala.server.util.CsvUtility;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

import static com.duokoala.server.enums.courseEnums.PerformanceCriteria.calculatePerformanceScore;
import static com.duokoala.server.enums.courseEnums.PerformanceCriteria.calculateRelevanceTypeFiledScore;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CourseService {
    ReviewRepository reviewRepository;
    CourseRepository courseRepository;
    CourseMapper courseMapper;
    TypeRepository typeRepository;
    AuthenticationService authenticationService;
    FieldRepository fieldRepository;
    DiscountCourseRepository discountCourseRepository;
    RequestDiscountRepository requestDiscountRepository;
    EnrollCourseRepository enrollCourseRepository;
    CloudinaryService cloudinaryService;

    public DiscountAppliedResponse getMaxApprovedDiscountRate(String courseId) {
        Float maxDiscountCourse = Optional.ofNullable(
                discountCourseRepository
                        .findMaxApprovedDiscountRateByCourseId(courseId)
        ).orElse(0.0f);

        Float maxRequestDiscount = Optional.ofNullable(
                requestDiscountRepository
                        .findMaxApprovedRequestDiscountRateByCourseId(courseId)
        ).orElse(0.0f);

        return DiscountAppliedResponse.builder()
                .discountApplied(Math.max(maxDiscountCourse, maxRequestDiscount))
                .build();
    }

    public CourseResponse create(CourseCreateRequest request) {
        Course course = courseMapper.toCourse(request);
        course.setCourseUploadedAt(LocalDateTime.now());
        var types = typeRepository.findAllById(request.getTypes());
        course.setTypes(new HashSet<>(types));
        var fields = fieldRepository.findAllById(request.getFields());
        course.setFields(new HashSet<>(fields));
        course.setCourseLevel(Level.fromString(request.getCourseLevel()));
        course.setUploadedByTeacher(
                authenticationService.getAuthenticatedTeacher());
        course.setStatus(Status.APPROVED);
        course.setDeleted(false);
        return courseMapper.toCourseResponse(courseRepository.save(course));
    }

    public CourseResponse update(String courseId, CourseUpdateRequest request) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND));
        courseMapper.updateCourse(course, request);
        var types = typeRepository.findAllById(request.getTypes());
        course.setTypes(new HashSet<>(types));
        var fields = fieldRepository.findAllById(request.getFields());
        course.setFields(new HashSet<>(fields));
        course.setCourseLevel(Level.fromString(request.getCourseLevel()));
        return courseMapper.toCourseResponse(courseRepository.save(course));
    }

    @Transactional
    public CourseResponse uploadImage(String courseId, MultipartFile imageFile) throws IOException {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND));
        if (course.getImage() != null) cloudinaryService.deleteImage(course.getImage().getImageId());
        course.setImage(cloudinaryService.uploadImage(imageFile));
        return courseMapper.toCourseResponse(courseRepository.save(course));
    }

    public CourseResponse get(String courseId) {
        var course = courseRepository.findById(courseId)
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND));
        return courseMapper
                .toCourseResponse(course);
    }

    public List<CourseResponse> getAll() {
        var courses = courseRepository.findAll().stream()
                .filter(course -> !course.isDeleted())
                .sorted(Comparator.comparing(Course::getCourseUploadedAt).reversed()) //newest first
                .toList();
        return courses.stream().map(courseMapper::toCourseResponse).toList();
    }

    public CoursePriceResponse getCoursePrice() {
        return CoursePriceResponse.builder()
                .maxCoursePrice(Optional.ofNullable(courseRepository.getMaxPrice()
                ).orElse(0.0f))
                .minCoursePrice(Optional.ofNullable(courseRepository.getMinPrice()
                ).orElse(0.0f))
                .build();
    }

    public List<CourseResponse> getAvailableCourses() {
        var courses = courseRepository.findAllByStatus(Status.APPROVED);
        return courses.stream()
                .filter(course -> !course.isDeleted())
                .sorted(Comparator.comparing(Course::getCourseUploadedAt).reversed()) // newest first
                .map(courseMapper::toCourseResponse).toList();
    }

    public List<CourseResponse> getListByTeacherId(String teacherId) {
        var courses = courseRepository.getListByTeacherId(teacherId);
        return courses.stream().map(courseMapper::toCourseResponse).toList();
    }

    public List<CourseResponse> getMyUploadedCourses() {
        var courses = courseRepository
                .findAllByUploadedByTeacher
                        (authenticationService.getAuthenticatedTeacher());
        return courses.stream()
                .filter(course -> !course.isDeleted())
                .sorted(Comparator.comparing(Course::getCourseUploadedAt).reversed()) // newest first
                .map(courseMapper::toCourseResponse).toList();
    }

    public void delete(String courseId) {
        var course = courseRepository.findById(courseId)
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND));
        course.setDeleted(true);
        courseRepository.save(course);
    }

    public CourseResponse approve(String courseId, CourseApproveRequest request) {
        Status approvedStatus = Status.validateApprovedStatus(request.getStatus());
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND));
        if (!Objects.isNull(course.getApprovedByAdmin()))
            throw new AppException(ErrorCode.COURSE_ALREADY_APPROVED);
        course.setStatus(approvedStatus);
        course.setApprovedByAdmin(authenticationService.getAuthenticatedAdmin());
        return courseMapper.toCourseResponse(courseRepository.save(course));
    }

    public CourseResponse sendToApprove(String courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND));
        course.setStatus(Status.PENDING_APPROVAL);
        return courseMapper.toCourseResponse(courseRepository.save(course));
    }

    private StatisticCourseResponse getStatisticCourse(Course course) {
        var statistic = courseMapper.toStatisticCourseResponse(course);
        statistic.setTotalEnrollments(enrollCourseRepository.countByCourse(course));
        statistic.setTotalCompleted(enrollCourseRepository.countByCourseAndProcess(course, 1.0f));
        statistic.setIncome(courseRepository.sumIncomeCourse(course.getCourseId()));
        return statistic;
    }

    public List<StatisticCourseResponse> getMyStatisticCoursesList() {
        var courses = courseRepository.findAllByUploadedByTeacher
                (authenticationService.getAuthenticatedTeacher());
        return courses.stream()
                .filter(course -> !course.isDeleted())
                .map(this::getStatisticCourse).toList();
    }

    private PerformingCourseResponse getPerformingCourse(Course course) {
        PerformingCourseResponse courseResponse
                = courseMapper.toPerformingCourseResponse(course);
        courseResponse.setAVGCourseRating
                (reviewRepository.getAvgCourse(course.getCourseId()));
        courseResponse.setNumberOfReviews(reviewRepository.countReviewByCourse(course));
        courseResponse.setIncome(courseRepository.sumIncomeCourse(courseResponse.getCourseId()));
        courseResponse.setNumberOfEnrollments(enrollCourseRepository.countByCourse(course));
        return courseResponse;
    }

    public List<PerformingCourseResponse> getMyPerformingCoursesList(int months) {
        List<Course> courses = courseRepository.findAllByUploadedByTeacherAndEnrollCoursesEnrollAtAfter(
                authenticationService.getAuthenticatedTeacher(),
                LocalDateTime.now().minusMonths(months)
        );
        return courses.stream()
                .filter(course -> !course.isDeleted())
                .map(this::getPerformingCourse)
                .sorted((c1, c2) -> Double.compare(calculateScore(c2), calculateScore(c1)))
                .toList();
    }

    public List<CourseResponse> getSuggestCourses(String courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND));

        EnrollCourse enrollCourse = enrollCourseRepository.findByCourseAndStudent(course,
                        authenticationService.getAuthenticatedStudent())
                .orElseThrow(() -> new AppException(ErrorCode.ENROLL_COURSE_NOT_FOUND));
        if (enrollCourse.getProcess() < 1.0f) throw new AppException(ErrorCode.COURSE_NOT_COMPLETED);
//      if (enrollCourse.isSuggest()) throw new AppException(ErrorCode.COURSE_ALREADY_SUGGESTED);
        Set<String> enrollCourseFields = enrollCourse
                .getCourse()
                .getFields()
                .stream()
                .map(Field::getFieldName)
                .collect(Collectors.toSet());

        Set<String> enrollCourseTypes = enrollCourse
                .getCourse()
                .getTypes()
                .stream()
                .map(Type::getTypeName)
                .collect(Collectors.toSet());

        List<CourseResponse> courseResponses = recommendCourses().stream()
                .filter(recommendCourse -> recommendCourse.getTypes().stream().map(TypeResponse::getTypeName).anyMatch(enrollCourseTypes::contains) ||
                        recommendCourse.getFields().stream().map(FieldResponse::getFieldName).anyMatch(enrollCourseFields::contains))
                .limit(3)
                .toList();
        enrollCourse.setSuggest(true);
        enrollCourseRepository.save(enrollCourse);
        return courseResponses;
    }

    public List<CourseResponse> recommendCourses() {
        Student student = authenticationService.getAuthenticatedStudent();

        List<EnrollCourse> enrollCourses = enrollCourseRepository
                .findTop3ByStudentOrderByEnrollAtDesc(student);

        List<Course> courses = enrollCourses.stream()
                .map(EnrollCourse::getCourse).toList();

        List<Type> types = courses.stream()
                .map(Course::getTypes)
                .flatMap(Set::stream)
                .toList();

        List<Field> fields = courses.stream()
                .map(Course::getFields)
                .flatMap(Set::stream)
                .toList();

        return courseRepository.findAll().stream()
                .filter(course -> !course.isDeleted())
                .map(this::getPerformingCourse)
                .sorted((c1, c2) -> Double.compare(calculateScore(c2), calculateScore(c1)))
                .map(PerformingCourseResponse::getCourseId)
                .map(courseRepository::findById)
                .filter(Optional::isPresent)
                .sorted((c1, c2) -> {
                    Course course1 = c1.get();
                    Course course2 = c2.get();
                    return Double.compare(calculateRelevanceTypeFiledScore(course2, types, fields),
                            calculateRelevanceTypeFiledScore(course1, types, fields));
                })
                .map(Optional::get)
                .limit(10)
                .map(courseMapper::toCourseResponse)
                .toList();
    }

    public double calculateScore(PerformingCourseResponse performingCourse) {
        return calculatePerformanceScore(
                performingCourse.getNumberOfReviews(),
                performingCourse.getAVGCourseRating(),
                performingCourse.getNumberOfEnrollments(),
                performingCourse.getIncome(),
                0,
                reviewRepository.findMaxCountReviewGroupByCourseId(),
                0,
                1.0,
                0,
                enrollCourseRepository.findMaxCountEnrollCourseGroupByCourseId(),
                0,
                courseRepository.getMaxPrice());
    }

    @Transactional
    public List<CourseResponse> saveCsvFile(MultipartFile file) {
        if (!CsvUtility.hasCsvFormat(file))
            throw new AppException(ErrorCode.INVALID_REQUEST_DATA);
        try {
            List<CourseCreateRequest> requestCourseList = CsvUtility.csvToCourseRequestList(file.getInputStream());
            return requestCourseList.stream().map(this::create).toList();
        } catch (IOException ex) {
            throw new RuntimeException("Data is not store successfully: " + ex.getMessage());
        }
    }
}
