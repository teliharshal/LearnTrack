package com.LearnTrack.skilltrack_backend.service;


import com.LearnTrack.skilltrack_backend.entity.ConsitencyTracker;
import com.LearnTrack.skilltrack_backend.repository.ConsistencyTrackerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class ConsistencyTrackerServices {

    @Autowired
    private ConsistencyTrackerRepository consistencyTrackerRepository;

    public ConsitencyTracker markStudy(ConsitencyTracker tracker){
        return consistencyTrackerRepository.save(tracker);
    }

    public List<ConsitencyTracker> getConsistency(Long consitencyTracker){
        return consistencyTrackerRepository.findByEmployeeSkillId(consitencyTracker);
    }
}
