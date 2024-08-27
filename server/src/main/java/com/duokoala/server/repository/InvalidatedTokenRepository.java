package com.duokoala.server.repository;

import com.duokoala.server.entity.InvalidatedToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InvalidatedTokenRepository extends JpaRepository<InvalidatedToken,String> {
    @Override
    boolean existsById(String id);
}
