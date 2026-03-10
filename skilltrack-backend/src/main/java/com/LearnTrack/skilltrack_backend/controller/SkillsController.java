package com.LearnTrack.skilltrack_backend.controller;
import com.LearnTrack.skilltrack_backend.entity.EmployeeSkillEntity;
import com.LearnTrack.skilltrack_backend.entity.SkillEntity;
import com.LearnTrack.skilltrack_backend.repository.EmployeeSkillRepository;
import com.LearnTrack.skilltrack_backend.repository.SkillRepository;
import com.LearnTrack.skilltrack_backend.service.SkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping(value = "api/skills")
public class SkillsController {

    @Autowired
    private SkillService skillService;

    @Autowired
    private EmployeeSkillRepository repository;

    @Autowired
    private SkillRepository skillRepository;

    @PostMapping
    public SkillEntity addSkills(@RequestBody SkillEntity skillEntity){
        return skillService.addSkill(skillEntity);
    }

    @GetMapping
    public List<SkillEntity> getSkills(){
        return skillService.getSkill();
    }

    @GetMapping("/{employeeId}")
    public List<EmployeeSkillEntity> getSkillsByEmployee(@PathVariable Long employeeId){
        return repository.findByEmployeeId(employeeId);
    }

    @PostMapping("/add")
    public EmployeeSkillEntity addSkill(@RequestBody EmployeeSkillEntity skill){
        skill.setEndDate(skill.getStartDate().plusDays(skill.getTargetDurationDays()));
        skill.setStatus("IN_PROGRESS");
        return repository.save(skill);
    }

    @PutMapping("/progress/{id}")
    public EmployeeSkillEntity updateProgress(@PathVariable Long id, @RequestBody EmployeeSkillEntity request){

        EmployeeSkillEntity skill = repository.findById(id).orElseThrow();

        skill.setProgressPercentage(request.getProgressPercentage());

        if(request.getProgressPercentage() == 100){
            skill.setStatus("COMPLETED");
        }

        return repository.save(skill);
    }

    @DeleteMapping("{id}")
    public void deleteSkills(@PathVariable Long id){
         skillRepository.deleteById(id);
    }

    @GetMapping("/dashboard/in-progress")
    public List<EmployeeSkillEntity> skillsInProgress(){
        return skillService.getInProgressStatus();
    }

    @GetMapping("/dashboard/completed")
    public List<EmployeeSkillEntity> skillsCompleted(){
        return skillService.getCompletedStatus();
    }

    @GetMapping("dashboard/total-skills")
    public long getTotalSkills(){
        return skillService.getTotalSkills();
    }

    @GetMapping("/remaining-days/{id}")
    public long remainingDays(@PathVariable Long id){
        return skillService.getRemainingDays(id);
    }
}
