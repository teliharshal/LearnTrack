package com.LearnTrack.skilltrack_backend.repository;

import com.LearnTrack.skilltrack_backend.entity.EmployeeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<EmployeeEntity, Long> {
    Optional<EmployeeEntity> findByEmail(String email);
}
