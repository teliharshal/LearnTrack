package com.LearnTrack.skilltrack_backend.controller;

import com.LearnTrack.skilltrack_backend.dto.LoginRequest;
import com.LearnTrack.skilltrack_backend.dto.LoginResponse;
import com.LearnTrack.skilltrack_backend.entity.EmployeeEntity;
import com.LearnTrack.skilltrack_backend.service.AuthServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AuthServices authServices;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest loginRequest){

        return authServices.login(
                loginRequest.getEmail(),
                loginRequest.getPassword()
        );

    }

    @PostMapping("/register")
    public EmployeeEntity registerEmployee(@RequestBody EmployeeEntity employee) {

        return authServices.registerEmployee(employee);

    }

}