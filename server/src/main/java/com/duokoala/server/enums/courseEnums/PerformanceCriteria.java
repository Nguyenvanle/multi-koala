package com.duokoala.server.enums.courseEnums;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.experimental.FieldDefaults;

@Getter
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public enum PerformanceCriteria {
    REVIEW_COUNT(0.2),
    REVIEW_AVERAGE(0.4),
    REGISTRATION_COUNT(0.2),
    REVENUE(0.2);
    double weight;

    public static double normalize(double value, double min, double max) {
        if (max == min) return 0;
        return (value - min) / (max - min);
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
