package com.duokoala.server.repository;

import com.duokoala.server.entity.QuizResult;
import com.duokoala.server.entity.StudentAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentAnswerRepository extends JpaRepository<StudentAnswer, String> {
    List<StudentAnswer> findAllByQuizResult(QuizResult quizResult);
}
