package com.duokoala.server.repository;

import com.duokoala.server.entity.Course;
import com.duokoala.server.entity.RequestDiscount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RequestDiscountRepository extends JpaRepository<RequestDiscount, String> {
    List<RequestDiscount> findAllByCourse(Course course);
}
