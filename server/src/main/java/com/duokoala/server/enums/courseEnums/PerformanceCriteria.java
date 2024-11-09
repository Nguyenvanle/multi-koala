package com.duokoala.server.enums.courseEnums;

import com.duokoala.server.entity.Course;
import com.duokoala.server.entity.Field;
import com.duokoala.server.entity.Type;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public enum PerformanceCriteria {
    REVIEW_COUNT(0.3),
    REVIEW_AVERAGE(0.4),
    REGISTRATION_COUNT(0.2),
    REVENUE(0.2),

    TYPE_COURSE(2.0),
    FIELD_COURSE(1.5);
    double weight;

    public static double normalize(double value, double min, double max) {
        if (max == min) return 0;
        return (value - min) / (max - min);
    }

    public static double calculateRelevanceTypeFiledScore(Course course, List<Type> myTypes, List<Field> myFields) {
        double typeScore = 0;
        double filedScore = 0;
        for (Type type : myTypes) {
            if (course.getTypes().equals(type)) {
                typeScore += TYPE_COURSE.weight;
                break;
            }
        }
        for (Field field : myFields) {
            if (course.getFields().equals(field)) {
                typeScore += TYPE_COURSE.weight;
                break;
            }
        }

        return typeScore + filedScore;
    }

    public static double calculatePerformanceScore(double reviewCount,
                                                   double reviewAverage,
                                                   double enrollmentCount,
                                                   double revenue,
                                                   double minReviewCount, double maxReviewCount,
                                                   double minReviewAverage, double maxReviewAverage,
                                                   double minEnrollmentCount, double maxEnrollmentCount,
                                                   double minRevenue, double maxRevenue) {
        return REVIEW_COUNT.weight * normalize(reviewCount, minReviewCount, maxReviewCount) +
                REVIEW_AVERAGE.weight * normalize(reviewAverage, minReviewAverage, maxReviewAverage) +
                REGISTRATION_COUNT.weight * normalize(enrollmentCount, minEnrollmentCount, maxEnrollmentCount) +
                REVENUE.weight * normalize(revenue, minRevenue, maxRevenue);
    }
}
