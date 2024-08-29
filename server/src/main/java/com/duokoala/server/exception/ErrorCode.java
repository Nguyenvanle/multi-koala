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

    UNCATEGORIZED_EXCEPTION(9999,"Uncategorized error!", HttpStatus.INTERNAL_SERVER_ERROR),

    USERNAME_EXISTED(1001,"Username existed!", HttpStatus.BAD_REQUEST),
    USER_NOT_EXISTED(1002,"User not existed!", HttpStatus.BAD_REQUEST),
    TEACHER_NOT_EXISTED(1003,"Teacher not existed!", HttpStatus.BAD_REQUEST),
    ADMIN_NOT_EXISTED(1004,"Admin not existed!", HttpStatus.BAD_REQUEST),
    STUDENT_NOT_EXISTED(1005,"Student not existed!", HttpStatus.BAD_REQUEST),

    IMAGE_NOT_EXISTED(1006,"Image not existed!", HttpStatus.BAD_REQUEST),
    VIDEO_NOT_EXISTED(1007,"Video not existed!", HttpStatus.BAD_REQUEST),
    ROLE_NOT_EXISTED(1008,"Role not existed!", HttpStatus.BAD_REQUEST),
    CERTIFICATION_NOT_EXISTED(1009,"Certification not existed!", HttpStatus.BAD_REQUEST),
    STATUS_NOT_EXISTED(1010,"Status not existed!", HttpStatus.BAD_REQUEST),
    APPROVED_STATUS_NOT_EXISTED(1011,"Approved status not existed!", HttpStatus.BAD_REQUEST),
    CERTIFICATION_IS_APPROVED(1012,"Certification is approved!", HttpStatus.BAD_REQUEST),

    UNAUTHENTICATED(1013,"Unauthenticated!", HttpStatus.UNAUTHORIZED),

    NOT_FOUND_PATH(2000, "Not found this endpoint!",HttpStatus.BAD_REQUEST),
    INCORRECT_FORMAT_JPA(2001,"Format JPA Incorrect, check request data again!",HttpStatus.BAD_REQUEST),
    ACCESS_DENIED(2002, "Access denied (you don't have permission to access this HTTP)",HttpStatus.INTERNAL_SERVER_ERROR)
    ;
    final int code;
    String message;
    private HttpStatusCode statusCode;
}
