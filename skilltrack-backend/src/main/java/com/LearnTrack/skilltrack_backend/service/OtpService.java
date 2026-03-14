package com.LearnTrack.skilltrack_backend.service;

import com.LearnTrack.skilltrack_backend.entity.EmployeeEntity;
import com.LearnTrack.skilltrack_backend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

@Service
public class OtpService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private JavaMailSender mailSender;

    // Temporary OTP storage
    private Map<String, String> otpStorage = new HashMap<>();

    public void sendOtp(String email) {

        Optional<EmployeeEntity> employee = employeeRepository.findByEmail(email);

        if (employee == null) {
            throw new RuntimeException("Email not registered");
        }

        // Generate 6 digit OTP
        String otp = String.format("%06d", new Random().nextInt(999999));

        otpStorage.put(email, otp);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("SkillTrack Password Reset OTP");
        message.setText("Your OTP is: " + otp);

        mailSender.send(message);
    }

    public String verifyOtp(String email, String otp){

        String storedOtp = otpStorage.get(email);

        if(storedOtp == null){
            throw new RuntimeException("OTP not found");
        }

        if(!storedOtp.equals(otp)){
            throw new RuntimeException("Invalid OTP");
        }

        return "OTP verified";
    }

    public String resetPassword(String email, String newPassword){

        EmployeeEntity employee =
                employeeRepository.findByEmail(email)
                        .orElseThrow(() -> new RuntimeException("User not found"));

        employee.setPassword(newPassword);

        employeeRepository.save(employee);

        otpStorage.remove(email);

        return "Password reset successful";
    }
}