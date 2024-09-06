package com.duokoala.server.repository;

import com.duokoala.server.entity.QuizResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
    public interface QuizResultRepository extends JpaRepository<QuizResult,String> {
}
