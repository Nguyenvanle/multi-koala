package com.duokoala.server.repository.userRepository;

import com.duokoala.server.entity.user.Student;
import com.duokoala.server.entity.user.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, String> {
    Optional<Teacher> findByUsername(String username);
}
