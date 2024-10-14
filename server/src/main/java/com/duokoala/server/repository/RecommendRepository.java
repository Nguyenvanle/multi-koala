package com.duokoala.server.repository;

import com.duokoala.server.entity.Recommend;
import com.duokoala.server.entity.user.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecommendRepository extends JpaRepository<Recommend,String> {
    boolean existsByStudent(Student student);
}
