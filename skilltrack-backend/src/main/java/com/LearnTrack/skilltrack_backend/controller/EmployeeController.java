package com.LearnTrack.skilltrack_backend.controller;

import com.LearnTrack.skilltrack_backend.entity.EmployeeEntity;
import com.LearnTrack.skilltrack_backend.service.EmployeeServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/employee")
public class EmployeeController {

    @Autowired
    private EmployeeServices employeeServices;

    @PostMapping
    public EmployeeEntity addEmployee(@RequestBody EmployeeEntity employee){
        return employeeServices.addEmployee(employee);
    }

    @GetMapping
    public List<EmployeeEntity> getEmployees(){
        return employeeServices.getEmployees();
    }

    @DeleteMapping("{id}")
    public void deleteEmployee(@PathVariable Long id){
        employeeServices.deleteEmployee(id);
    }

    @GetMapping("dashboard/total-employees")
    public long getTotalEmployees(){
        return employeeServices.getTotalEmployee();
    }

}
