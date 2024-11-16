package com.duokoala.server.entity.user;

import com.duokoala.server.entity.LessonStudent;
import com.duokoala.server.entity.QuizResult;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import lombok.Getter;

import java.util.List;

@Getter
@Entity
public class Student extends User {
    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "student", cascade = CascadeType.ALL)
    List<QuizResult> quizResults;
    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "student", cascade = CascadeType.ALL)
    List<LessonStudent> lessonStudents;
}
