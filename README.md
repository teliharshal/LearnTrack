# SkillTrack - Employee Skill Tracking System

## Overview
SkillTrack is a backend system designed to help organizations track employee skills, learning progress, and consistency in skill development.

The system allows employees to track their learning progress while administrators can manage employees and monitor skill development across the organization.

---

## Tech Stack

Backend
- Spring Boot
- Spring Security
- JWT Authentication
- MySQL
- Hibernate / JPA

Frontend (Planned)
- React.js
- Tailwind CSS

---

## Features

### Authentication
- JWT based login system
- Secure API endpoints

### Role Based Access Control
- ADMIN
- EMPLOYEE

### Employee Management
- Add employees
- View employees
- Delete employees

### Skill Tracking
- Add skills
- Assign skills to employees
- Track skill progress

### Progress Management
- Track learning percentage
- Update skill status

### Consistency Tracker
- Track daily learning consistency

### Dashboard APIs
- Skills in progress
- Completed skills
- Employee statistics

---

## Database Tables

- employee_entity
- skill_entity
- employee_skill_entity
- consistency_tracker

---

## API Endpoints

### Authentication
POST /api/auth/login

### Employees
GET /api/employee  
POST /api/employee  
DELETE /api/employee/{id}

### Skills
GET /api/skills  
POST /api/skills

### Progress
PUT /api/skills/progress/{id}

### Consistency
POST /api/consistency

---

## Project Structure
