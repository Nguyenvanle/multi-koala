package com.duokoala.server.repository;

import com.duokoala.server.entity.Reference;
import com.duokoala.server.entity.user.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReferenceRepository extends JpaRepository<Reference,String> {
    boolean existsByStudent(Student student);
}
