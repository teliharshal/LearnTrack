package com.LearnTrack.skilltrack_backend.service;

import com.LearnTrack.skilltrack_backend.entity.EmployeeEntity;
import com.LearnTrack.skilltrack_backend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeServices {
    @Autowired
    private EmployeeRepository employeeRepository;

    public EmployeeEntity addEmployee(EmployeeEntity employee){
        return employeeRepository.save(employee);
    }

    public List<EmployeeEntity> getEmployees(){
        return employeeRepository.findAll();
    }

    public void deleteEmployee(Long id){
        employeeRepository.deleteById(id);
    }

    public long getTotalEmployee(){
        return employeeRepository.count();
    }

    public EmployeeEntity getEmployeeById(Long id){
        return employeeRepository.findById(id).orElseThrow();
    }


}
