package com.duokoala.server.exception;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public enum ErrorCode {

    // 5xx Server Errors
    UNCATEGORIZED_EXCEPTION(500, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR),

    // 4xx Client Errors
    USERNAME_EXISTED(409, "Conflict: Username already exists", HttpStatus.CONFLICT),
    TYPE_EXISTED(409, "Conflict: Type already exists", HttpStatus.CONFLICT),
    FIELD_EXISTED(409, "Conflict: Field already exists", HttpStatus.CONFLICT),
    DISCOUNT_COURSE_EXISTED(409, "Conflict: Discount for Course already exists", HttpStatus.CONFLICT),
    REFERENCE_EXISTED(409, "Conflict: Reference already exists", HttpStatus.CONFLICT),
    ENROLL_COURSE_EXISTED(409, "Conflict: Enroll for Course already exists", HttpStatus.CONFLICT),
    REVIEW_EXISTED(409, "Conflict: Review already exists", HttpStatus.CONFLICT),
    CERTIFICATION_ALREADY_APPROVED(409, "Conflict: Certification is already approved", HttpStatus.CONFLICT),
    COURSE_ALREADY_APPROVED(409, "Conflict: Course is already approved", HttpStatus.CONFLICT),
    DISCOUNT_COURSE_ALREADY_APPROVED(409, "Conflict: Discount for Course is already approved", HttpStatus.CONFLICT),


    REFERENCE_NOT_FOUND(404, "Not found: Reference does not exist", HttpStatus.NOT_FOUND),
    USER_NOT_FOUND(404, "Not found: User does not exist", HttpStatus.NOT_FOUND),
    TEACHER_NOT_FOUND(404, "Not found: Teacher does not exist", HttpStatus.NOT_FOUND),
    ADMIN_NOT_FOUND(404, "Not found: Admin does not exist", HttpStatus.NOT_FOUND),
    STUDENT_NOT_FOUND(404, "Not found: Student does not exist", HttpStatus.NOT_FOUND),
    IMAGE_NOT_FOUND(404, "Not found: Image does not exist", HttpStatus.NOT_FOUND),
    VIDEO_NOT_FOUND(404, "Not found: Video does not exist", HttpStatus.NOT_FOUND),
    ROLE_NOT_FOUND(404, "Not found: Role does not exist", HttpStatus.NOT_FOUND),
    CERTIFICATION_NOT_FOUND(404, "Not found: Certification does not exist", HttpStatus.NOT_FOUND),
    STATUS_NOT_FOUND(404, "Not found: Status does not exist", HttpStatus.NOT_FOUND),
    APPROVED_STATUS_NOT_FOUND(404, "Not found: Approved status does not exist", HttpStatus.NOT_FOUND),
    ENDPOINT_NOT_FOUND(404, "Not found: Endpoint does not exist", HttpStatus.NOT_FOUND),
    TYPE_NOT_FOUND(404, "Not found: Type does not exist", HttpStatus.NOT_FOUND),
    DISCOUNT_NOT_FOUND(404, "Not found: Discount does not exist", HttpStatus.NOT_FOUND),
    COURSE_NOT_FOUND(404, "Not found: Course does not exist", HttpStatus.NOT_FOUND),
    DISCOUNT_COURSE_NOT_FOUND(404, "Not found: Discount for Course does not exist", HttpStatus.NOT_FOUND),
    LESSON_NOT_FOUND(404, "Not found: Lesson does not exist", HttpStatus.NOT_FOUND),
    TEST_NOT_FOUND(404, "Not found: Test does not exist", HttpStatus.NOT_FOUND),
    QUESTION_NOT_FOUND(404, "Not found: Question does not exist", HttpStatus.NOT_FOUND),
    ENROLL_COURSE_NOT_FOUND(404, "Not found: Enroll for Course does not exist", HttpStatus.NOT_FOUND),
    REVIEW_NOT_FOUND(404, "Not found: Review does not exist", HttpStatus.NOT_FOUND),
    QUIZ_RESULT_NOT_FOUND(404, "Not found: Quiz Result does not exist", HttpStatus.NOT_FOUND),
    LEVEL_NOT_FOUND(404, "Not found: Level does not exist", HttpStatus.NOT_FOUND),
    FIELD_NOT_FOUND(404, "Not found: Field does not exist", HttpStatus.NOT_FOUND),
    REQUEST_DISCOUNT_NOT_FOUND(404, "Not found: Request discount does not exist", HttpStatus.NOT_FOUND),
    OTP_EXPIRED(404, "OTP is expired", HttpStatus.NOT_FOUND),
    ANSWER_NOT_FOUND(404, "Not Found: Answer does not exist", HttpStatus.NOT_FOUND),

    UNAUTHENTICATED(401, "Unauthorized: Authentication is required", HttpStatus.UNAUTHORIZED),
    TOKEN_INVALID(401, "Invalid token", HttpStatus.UNAUTHORIZED),
    ANSWER_DOES_NOT_BELONG_TO_QUESTION(400, "Bad Request: The answer does not belong to the question", HttpStatus.BAD_REQUEST),
    INVALID_REQUEST_DATA(400, "Bad request: Invalid request data", HttpStatus.BAD_REQUEST),
    INVALID_DATE_FORMAT(400, "Invalid date format: Failed to parse date. Expected format is yyyy-MM-dd.", HttpStatus.BAD_REQUEST),
    INVALID_ARGUMENT(400, "Invalid argument provided", HttpStatus.BAD_REQUEST),
    INVALID_ANSWER_FORMAT(400, "Invalid format: Answers must be a Set of Strings", HttpStatus.BAD_REQUEST),
    ACCESS_DENIED(403, "Forbidden: Access denied", HttpStatus.FORBIDDEN),
    INVALID_PASSWORD(401, "Invalid password: Password is incorrect", HttpStatus.UNAUTHORIZED),
    INVALID_OTP(400, "Invalid OTP: The provided OTP is incorrect", HttpStatus.BAD_REQUEST),
    ;
    final int code;
    String message;
    private HttpStatusCode statusCode;
}
