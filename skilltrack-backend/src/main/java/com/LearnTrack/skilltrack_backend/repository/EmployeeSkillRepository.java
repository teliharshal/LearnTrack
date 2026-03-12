package com.LearnTrack.skilltrack_backend.repository;

import com.LearnTrack.skilltrack_backend.entity.EmployeeSkillEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployeeSkillRepository extends JpaRepository<EmployeeSkillEntity , Long> {
    List<EmployeeSkillEntity> findByEmployeeId(Long employeeId);

    List<EmployeeSkillEntity> findByStatus(String status);
}
