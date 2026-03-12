package com.LearnTrack.skilltrack_backend.controller;

import com.LearnTrack.skilltrack_backend.entity.EmployeeSkillEntity;
import com.LearnTrack.skilltrack_backend.repository.EmployeeSkillRepository;
import com.LearnTrack.skilltrack_backend.service.SkillService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/employee/skills")
public class SkillsController {

    private final EmployeeSkillRepository employeeSkillRepository;
    private final SkillService skillService;

    public SkillsController(EmployeeSkillRepository employeeSkillRepository,
                            SkillService skillService) {
        this.employeeSkillRepository = employeeSkillRepository;
        this.skillService = skillService;
    }

    // Employee adds a skill
    @PostMapping("/add")
    public EmployeeSkillEntity addSkill(@RequestBody EmployeeSkillEntity skill){

        System.out.println("Employee ID received: " + skill.getEmployeeId());

        skill.setStartDate(LocalDate.now());

        if(skill.getProgressPercentage() == 100){
            skill.setStatus("COMPLETED");
        } else {
            skill.setStatus("IN_PROGRESS");
        }

        return employeeSkillRepository.save(skill);
    }


    // Get all skills for employee
    @GetMapping("/{employeeId}")
    public List<EmployeeSkillEntity> getSkillsByEmployee(@PathVariable Long employeeId){
        return employeeSkillRepository.findByEmployeeId(employeeId);
    }

    // Update progress
    @PutMapping("/progress/{id}")
    public EmployeeSkillEntity updateProgress(@PathVariable Long id,
                                              @RequestBody EmployeeSkillEntity request){

        EmployeeSkillEntity skill =
                employeeSkillRepository.findById(id).orElseThrow();

        skill.setProgressPercentage(request.getProgressPercentage());

        if(request.getProgressPercentage() == 100){
            skill.setStatus("COMPLETED");
        }

        return employeeSkillRepository.save(skill);
    }

    // Delete skill
    @DeleteMapping("/{id}")
    public void deleteSkill(@PathVariable Long id){
        employeeSkillRepository.deleteById(id);
    }

    // Dashboard APIs
    @GetMapping("/dashboard/in-progress")
    public List<EmployeeSkillEntity> skillsInProgress(){
        return skillService.getInProgressStatus();
    }

    @GetMapping("/dashboard/completed")
    public List<EmployeeSkillEntity> skillsCompleted(){
        return skillService.getCompletedStatus();
    }

    @GetMapping("/dashboard/total-skills")
    public long getTotalSkills(){
        return skillService.getTotalSkills();
    }

    @GetMapping("/remaining-days/{id}")
    public long remainingDays(@PathVariable Long id){
      return skillService.getRemainingDays(id);
    }
}