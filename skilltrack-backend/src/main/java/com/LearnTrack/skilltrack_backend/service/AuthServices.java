package com.LearnTrack.skilltrack_backend.service;

import com.LearnTrack.skilltrack_backend.dto.LoginResponse;
import com.LearnTrack.skilltrack_backend.entity.EmployeeEntity;
import com.LearnTrack.skilltrack_backend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class AuthServices {

    @Autowired
    private EmployeeRepository repository;

    public LoginResponse login(String email, String password){

        EmployeeEntity employee =
                repository.findByEmail(email)
                        .orElseThrow(() -> new RuntimeException("User Not Found"));

        if(!employee.getPassword().equals(password)){
            throw new RuntimeException("Invalid Password");
        }

        return new LoginResponse(
                employee.getId(),
                employee.getName(),
                employee.getEmail(),
                employee.getRole()
        );
    }

    public EmployeeEntity registerEmployee(EmployeeEntity employee) {

        if(employee.getPassword() == null || employee.getPassword().isEmpty()){
            throw new RuntimeException("Password cannot be empty");
        }

        employee.setRole("ROLE_EMPLOYEE");

        return repository.save(employee);
    }


}