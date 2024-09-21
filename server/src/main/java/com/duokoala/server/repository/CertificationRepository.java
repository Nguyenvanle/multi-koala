package com.duokoala.server.repository;

import com.duokoala.server.entity.Certification;
import com.duokoala.server.entity.user.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CertificationRepository extends JpaRepository<Certification, String> {
    List<Certification> findByUploadedByTeacher(Teacher teacher);
}
