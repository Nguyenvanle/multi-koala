package com.duokoala.server.repository;

import com.duokoala.server.entity.LessonStudent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LessonStudentRepository extends JpaRepository<LessonStudent, String> {
    
}
