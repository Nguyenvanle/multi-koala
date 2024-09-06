package com.duokoala.server.repository;

import com.duokoala.server.entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AnswerRepository extends JpaRepository<Answer,String> {
    @Query(nativeQuery = true,
            value = "SELECT COUNT(*) " +
                    "FROM question " +
                    "WHERE test_test_id = :testId")
    int countQuestionsByTestId(@Param("testId") String testId);
}
