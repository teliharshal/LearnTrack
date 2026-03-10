package com.LearnTrack.skilltrack_backend.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class ConsitencyTracker {
    public void setId(Long id) {
        this.id = id;
    }

    public void setEmployeeSkillId(Long employeeSkillId) {
        this.employeeSkillId = employeeSkillId;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public void setStudied(boolean studied) {
        this.studied = studied;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long employeeSkillId;

    private LocalDate date;

    private boolean studied;

    public Long getId() {
        return id;
    }

    public Long getEmployeeSkillId() {
        return employeeSkillId;
    }

    public LocalDate getDate() {
        return date;
    }

    public boolean isStudied() {
        return studied;
    }
}
