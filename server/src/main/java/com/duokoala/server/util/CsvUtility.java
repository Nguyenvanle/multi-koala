package com.duokoala.server.util;

import com.duokoala.server.dto.request.courseRequest.CourseCreateRequest;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;


public class CsvUtility {
    public static String TYPE = "text/csv";
    static String[] HEADERs = {
            "Course Name",
            "Course Description",
            "Course Price",
            "Course Level",
            "Types",
            "Fields",
            "Course Responsibility End At"
    };

    public static boolean hasCsvFormatCourse(MultipartFile file) {
        return TYPE.equals(file.getContentType());
    }

    public static List<CourseCreateRequest> csvToCourseRequestList(InputStream is) {
        try (BufferedReader bReader = new BufferedReader(new InputStreamReader(is, StandardCharsets.UTF_8));
             CSVParser csvParser = new CSVParser(bReader,
                     CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim())) {
            List<CourseCreateRequest> courseList = new ArrayList<>();
            Iterable<CSVRecord> csvRecords = csvParser.getRecords();
            for (CSVRecord csvRecord : csvRecords) {
                CourseCreateRequest courseRequest = CourseCreateRequest.builder()
                        .courseName(csvRecord.get("Course Name"))
                        .courseDescription(csvRecord.get("Course Description"))
                        .coursePrice(Float.parseFloat(csvRecord.get("Course Price")))
                        .courseLevel(csvRecord.get("Course Level"))
                        .types(Set.of(csvRecord.get("Types").split(";")))
                        .fields(Set.of(csvRecord.get("Fields").split(";")))
                        .courseResponsibilityEndAt(LocalDateTime.parse(csvRecord.get("Course Responsibility End At")))
                        .build();
                courseList.add(courseRequest);
            }
            return courseList;
        } catch (IOException e) {
            throw new RuntimeException("CSV data is failed to parse: " + e.getMessage());
        }
    }
}
