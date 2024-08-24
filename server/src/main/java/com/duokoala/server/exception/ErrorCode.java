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
    IMAGE_NOT_EXISTED(1003,"Image not existed!", HttpStatus.BAD_REQUEST),

    NOT_FOUND_PATH(2000, "Not found this endpoint!",HttpStatus.BAD_REQUEST),
    INCORRECT_FORMAT_JPA(2001,"Format JPA Incorrect, check request data again!",HttpStatus.BAD_REQUEST)
    ;
    final int code;
    String message;
    private HttpStatusCode statusCode;
}
