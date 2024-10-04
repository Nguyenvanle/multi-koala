package com.duokoala.server.repository;

import com.duokoala.server.entity.Lesson;
import com.duokoala.server.entity.Test;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestRepository extends JpaRepository<Test, String> {
    List<Test> findAllByLesson(Lesson lesson);
}
