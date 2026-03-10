package com.LearnTrack.skilltrack_backend.repository;

import com.LearnTrack.skilltrack_backend.entity.ConsitencyTracker;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConsistencyTrackerRepository extends JpaRepository<ConsitencyTracker , Long> {
    List<ConsitencyTracker> findByEmployeeSkillId(Long employeeSkillId);
}
