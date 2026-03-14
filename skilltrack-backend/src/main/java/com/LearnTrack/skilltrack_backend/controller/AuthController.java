package com.LearnTrack.skilltrack_backend.controller;

import com.LearnTrack.skilltrack_backend.dto.LoginRequest;
import com.LearnTrack.skilltrack_backend.dto.LoginResponse;
import com.LearnTrack.skilltrack_backend.entity.EmployeeEntity;
import com.LearnTrack.skilltrack_backend.service.AuthServices;
import com.LearnTrack.skilltrack_backend.service.OtpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AuthServices authServices;

    @Autowired
    private OtpService otpService;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest loginRequest){

        return authServices.login(
                loginRequest.getEmail(),
                loginRequest.getPassword()
        );

    }

    @PostMapping("/send-otp")
    public String sendOtp(@RequestBody Map<String, String> request) {

        String email = request.get("email");

        otpService.sendOtp(email);

        return "OTP sent successfully";
    }

    @PostMapping("/register")
    public EmployeeEntity register(@RequestBody EmployeeEntity employee) {
        return authServices.registerEmployee(employee);
    }

//    @PostMapping("/forgot-password")
//    public ResponseEntity<?> forgotPassword(@RequestBody Map<String,String> request){
//
//        String email = request.get("email");
//
//        otpService.sendOtp(email);
//
//        return ResponseEntity.ok("OTP sent to email");
//
//    }

//    @PostMapping("/verify-otp")
//    public String verifyOtp(@RequestBody Map<String,String> request){
//        return otpService.verifyOtp(request.get("email"), request.get("otp"));
//    }

    @PostMapping("/verify-otp")
    public String verifyOtp(@RequestBody Map<String,String> request){
        return otpService.verifyOtp(
                request.get("email"),
                request.get("otp")
        );
    }


    @PostMapping("/reset-password")
    public String resetPassword(@RequestBody Map<String,String> request){
        return otpService.resetPassword(
                request.get("email"),
                request.get("newPassword")
        );
    }



}