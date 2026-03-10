package com.LearnTrack.skilltrack_backend.controller;

import com.LearnTrack.skilltrack_backend.entity.ConsitencyTracker;
import com.LearnTrack.skilltrack_backend.repository.ConsistencyTrackerRepository;
import com.LearnTrack.skilltrack_backend.service.ConsistencyTrackerServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/consistency")
public class ConsistencyTrackerController {

    @Autowired
    private ConsistencyTrackerServices consistencyTrackerServices;

    @Autowired
    private ConsistencyTrackerRepository consistencyTrackerRepository;

    @PostMapping("/mark")
    public ConsitencyTracker markStudy(@RequestBody ConsitencyTracker tracker){
        return consistencyTrackerServices.markStudy(tracker);
    }

    @GetMapping("/{employeeSkillId}")
    public List<ConsitencyTracker> getConsistency(@PathVariable Long employeeSkillId){
        return consistencyTrackerServices.getConsistency(employeeSkillId);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        consistencyTrackerRepository.deleteById(id);
    }

}
