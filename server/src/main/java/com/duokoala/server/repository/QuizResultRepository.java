package com.duokoala.server.repository;

import com.duokoala.server.entity.QuizResult;
import com.duokoala.server.entity.Test;
import com.duokoala.server.entity.user.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
    public interface QuizResultRepository extends JpaRepository<QuizResult,String> {
    List<QuizResult> findAllByStudent(Student student);
    List<QuizResult> findAllByStudentAndTest(Student student, Test test);
}
