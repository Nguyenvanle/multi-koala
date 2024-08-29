package com.duokoala.server.enums;

import com.duokoala.server.exception.AppException;
import com.duokoala.server.exception.ErrorCode;
import lombok.Getter;

@Getter
public enum Status {
    PENDING_APPROVAL,
    APPROVED,
    REJECTED;

    public static Status fromString(String status) {
        try {
            return Status.valueOf(status);
        } catch (Exception e) {
            throw new AppException(ErrorCode.STATUS_NOT_EXISTED);
        }
    }

    public static Status validateApprovedStatus(String status) {
        Status approvedStatus = fromString(status);
        if (approvedStatus == PENDING_APPROVAL)
            throw new AppException(ErrorCode.APPROVED_STATUS_NOT_EXISTED);
        return approvedStatus;
    }
}
