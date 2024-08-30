package com.duokoala.server.repository;

import com.duokoala.server.entity.Answer;
import com.duokoala.server.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnswerRepository extends JpaRepository<Answer,String> {

}
