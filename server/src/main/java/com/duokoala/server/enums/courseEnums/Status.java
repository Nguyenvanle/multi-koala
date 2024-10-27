package com.duokoala.server.enums.courseEnums;

import com.duokoala.server.exception.AppException;
import com.duokoala.server.exception.ErrorCode;
import lombok.Getter;

@Getter
public enum Status {
    PENDING_APPROVAL,
    APPROVED,
    REJECTED,
    IN_EDITING;

    public static Status fromString(String status) {
        try {
            return Status.valueOf(status);
        } catch (Exception e) {
            throw new AppException(ErrorCode.STATUS_NOT_FOUND);
        }
    }

    public static Status validateApprovedStatus(String status) {
        Status approvedStatus = fromString(status);
        if (approvedStatus != APPROVED && approvedStatus != REJECTED)
            throw new AppException(ErrorCode.APPROVED_STATUS_NOT_FOUND);
        return approvedStatus;
    }
}
