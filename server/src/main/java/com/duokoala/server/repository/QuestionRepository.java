package com.duokoala.server.repository;

import com.duokoala.server.entity.Question;
import com.duokoala.server.entity.Test;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question,String> {
    @Query(nativeQuery = true,
            value = "SELECT COUNT(*) " +
                    "FROM question " +
                    "WHERE test_test_id = :testId")
    int countQuestionsByTestId(@Param("testId") String testId);
    List<Question> findAllByTestAndIsActive(Test test,boolean isActive);
}
