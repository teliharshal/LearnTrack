package com.LearnTrack.skilltrack_backend.controller;

import com.LearnTrack.skilltrack_backend.dto.LoginRequest;
import com.LearnTrack.skilltrack_backend.service.AuthServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping(value = "/api/auth")
public class AuthController {

    @Autowired
    private AuthServices authServices;

    @PostMapping("/login")
    public Map<String , String> Login(@RequestBody LoginRequest loginRequest){

        System.out.println("LOGIN API HIT");
        String token = authServices.login(loginRequest.getEmail(),loginRequest.getPassword());
        return Map.of("token",token);
    }

}
