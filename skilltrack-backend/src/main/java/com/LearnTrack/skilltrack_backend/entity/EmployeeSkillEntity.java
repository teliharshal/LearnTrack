package com.LearnTrack.skilltrack_backend.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class EmployeeSkillEntity {

    public long getId() {
        return id;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public Long getSkillId() {
        return skillId;
    }

    public int getTargetDurationDays() {
        return targetDurationDays;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public int getProgressPercentage() {
        return progressPercentage;
    }

    public String getStatus() {
        return status;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public void setSkillId(Long skillId) {
        this.skillId = skillId;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public void setTargetDurationDays(int targetDurationDays) {
        this.targetDurationDays = targetDurationDays;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public void setProgressPercentage(int progressPercentage) {
        this.progressPercentage = progressPercentage;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     private long id;

    private Long employeeId;
    private Long skillId;
    private LocalDate startDate;
    private int targetDurationDays;
    private LocalDate endDate;
    private int progressPercentage;
    private String status;

}
