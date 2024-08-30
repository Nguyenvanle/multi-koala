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
    CERTIFICATION_ALREADY_APPROVED(409, "Conflict: Certification is already approved", HttpStatus.CONFLICT),
    UNAUTHENTICATED(401, "Unauthorized: Authentication is required", HttpStatus.UNAUTHORIZED),
    ENDPOINT_NOT_FOUND(404, "Not found: Endpoint does not exist", HttpStatus.NOT_FOUND),
    INVALID_REQUEST_DATA(400, "Bad request: Invalid request data", HttpStatus.BAD_REQUEST),
    ACCESS_DENIED(403, "Forbidden: Access denied", HttpStatus.FORBIDDEN);
    ;
    final int code;
    String message;
    private HttpStatusCode statusCode;
}
