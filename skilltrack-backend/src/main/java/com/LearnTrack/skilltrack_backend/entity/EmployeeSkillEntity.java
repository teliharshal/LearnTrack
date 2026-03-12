package com.LearnTrack.skilltrack_backend.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "employee_skill_entity")
public class EmployeeSkillEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long employeeId;

    private String skillName;

    private String category;

    private int progressPercentage;

    private LocalDate startDate;

    public void setEndDate(LocalDate enDate) {
        this.endDate = enDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    private LocalDate endDate;

    private String status;

    // ADD THIS FIELD
    private int targetDurationDays;

    // getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public String getSkillName() {
        return skillName;
    }

    public void setSkillName(String skillName) {
        this.skillName = skillName;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public int getProgressPercentage() {
        return progressPercentage;
    }

    public void setProgressPercentage(int progressPercentage) {
        this.progressPercentage = progressPercentage;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    // NEW FIELD GETTER/SETTER
    public int getTargetDurationDays() {
        return targetDurationDays;
    }

    public void setTargetDurationDays(int targetDurationDays) {
        this.targetDurationDays = targetDurationDays;
    }
}