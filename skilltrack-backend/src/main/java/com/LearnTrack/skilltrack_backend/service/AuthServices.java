package com.LearnTrack.skilltrack_backend.service;

import com.LearnTrack.skilltrack_backend.entity.EmployeeEntity;
import com.LearnTrack.skilltrack_backend.repository.EmployeeRepository;
import com.LearnTrack.skilltrack_backend.security.Jwtutil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthServices {

    @Autowired
    private  EmployeeRepository repository;

    @Autowired
    private Jwtutil jwtutil;

    public String login(String email,String password){

        EmployeeEntity employee =
                repository.findByEmail(email)
                        .orElseThrow(() -> new RuntimeException("User Not Found"));

        if(!employee.getPassword().equals(password)){
            throw new RuntimeException("Invalid Password");
        }

        return jwtutil.generateToken(employee.getEmail(), employee.getRole());
    }
}
