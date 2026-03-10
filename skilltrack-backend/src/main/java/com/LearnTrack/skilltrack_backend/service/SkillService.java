package com.LearnTrack.skilltrack_backend.service;

import com.LearnTrack.skilltrack_backend.entity.EmployeeSkillEntity;
import com.LearnTrack.skilltrack_backend.entity.SkillEntity;
import com.LearnTrack.skilltrack_backend.repository.EmployeeSkillRepository;
import com.LearnTrack.skilltrack_backend.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class SkillService {

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private EmployeeSkillRepository employeeSkillRepository;

    public SkillEntity addSkill(SkillEntity skill){
        return skillRepository.save(skill);
    }

    public List<SkillEntity> getSkill(){
        return skillRepository.findAll();
    }

    public Long getTotalSkills(){
        return skillRepository.count();
    }

    public List<EmployeeSkillEntity> getInProgressStatus(){
        return employeeSkillRepository.findByStatus("In_Progress");
    }

    public List<EmployeeSkillEntity> getCompletedStatus(){
        return employeeSkillRepository.findByStatus("Completed");
    }

    public Long getRemainingDays(Long id){
        EmployeeSkillEntity skill = employeeSkillRepository.findById(id).orElseThrow();
        return ChronoUnit.DAYS.between(LocalDate.now(),skill.getEndDate());
    }
}
