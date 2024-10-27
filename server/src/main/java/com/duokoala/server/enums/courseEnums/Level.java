package com.duokoala.server.enums.courseEnums;

import com.duokoala.server.exception.AppException;
import com.duokoala.server.exception.ErrorCode;
import lombok.Getter;

@Getter
public enum Level {
    BEGINNER("For complete beginners with no prior knowledge."),
    INTERMEDIATE("For those who have basic knowledge and want to enhance their skills."),
    ADVANCED("For individuals with solid knowledge looking to deepen their understanding."),
    EXPERT("For highly skilled individuals seeking advanced expertise.");
    private final String LevelDescription;

    Level(String levelDescription) {
        LevelDescription = levelDescription;
    }

    public static Level fromString(String level) {
        try {
            return Level.valueOf(level);
        } catch (Exception e) {
            throw new AppException(ErrorCode.LEVEL_NOT_FOUND);
        }
    }
}
