# 🚖 AG RIDES - Ride Sharing Application

A full-stack Ride Sharing Application built using **React + Vite**, **Spring Boot**, **MySQL**, and **Firebase Authentication**. The platform allows users to register, authenticate using OTP verification, book rides, track rides in real-time, manage payments, view ride history, and maintain user profiles. The application also includes an Admin Panel for managing users through CRUD operations.

---

# 📌 Project Overview

AG RIDES is a modern ride-sharing platform designed to provide a seamless transportation booking experience. The system consists of a React-based frontend and a Spring Boot backend connected through REST APIs. Firebase Authentication is used for secure user verification, while MySQL stores user and ride-related information.

The application supports:

* User Authentication
* OTP Verification
* Ride Booking
* Ride Confirmation
* Live Ride Tracking
* Payment Management
* Ride History
* User Profile Management
* Admin User Management
* REST API Integration
* Responsive Design

---

# 🎯 Objectives

* Provide secure user authentication.
* Simplify ride booking and management.
* Enable real-time ride tracking.
* Maintain ride and payment history.
* Offer user profile management.
* Provide administrative control over users.
* Ensure scalability using modern web technologies.

---

# 🏗️ System Architecture

Frontend (React + Vite)
↓
REST APIs
↓
Backend (Spring Boot)
↓
MySQL Database

Authentication Layer
↓
Firebase Authentication

---

# 🛠️ Technology Stack

## Frontend

* React.js
* Vite
* React Router DOM
* JavaScript (ES6+)
* CSS3

## Backend

* Java 21
* Spring Boot
* Spring MVC
* Spring Data JPA
* Hibernate

## Database

* MySQL

## Authentication

* Firebase Authentication
* OTP Verification

## Tools & Deployment

* Maven
* Docker
* Git & GitHub
* Postman

---

# 📂 Frontend Structure

```plaintext
src/
│
├── assets/
│
├── components/
│   ├── HomeScreen.jsx
│   ├── LiveTracking.jsx
│   ├── Login.jsx
│   ├── MapDemo.jsx
│   ├── Navbar.jsx
│   ├── PaymentPage.jsx
│   ├── Profile.jsx
│   ├── RideBookingFrom.jsx
│   ├── RideConfirmation.jsx
│   ├── RideHistory.jsx
│   ├── RideMapWithVehicle.jsx
│   ├── SendOtp.jsx
│   ├── Signup.jsx
│   ├── SplashScreen.jsx
│   ├── UserManagement.jsx
│   └── VerifyOtp.jsx
│
├── CSS/
├── router/
│   └── routes.js
│
├── firebase.js
├── App.jsx
├── main.jsx
└── index.css
```

---

# 📂 Backend Structure

```plaintext
src/main/java/com.example.aws
│
├── config/
│   └── WebConfig.java
│
├── controller/
│   ├── RideBookingController.java
│   └── UserController.java
│
├── dao/
│   ├── RideBookingDao.java
│   └── UserDao.java
│
├── models/
│   ├── RideBooking.java
│   └── Users.java
│
├── repository/
│   └── UserRepository.java
│
├── service/
│   ├── RideBookingService.java
│   └── UserService.java
│
└── AwsApplication.java
```

---

# ✨ Features

## 🔐 Authentication Module

* User Signup
* User Login
* OTP Verification
* Firebase Authentication
* Protected Routes
* Session Management

### Login Page

The Login Page acts as the entry point to the application. Users can authenticate using their Full Name and Email Address. After successful verification, users gain access to protected application features.

Features:

* Full Name Validation
* Email Validation
* Secure Authentication
* Signup Navigation
* Responsive Design

---

## 🚗 Ride Booking System

Users can:

* Enter Pickup Location
* Enter Destination
* Book Rides
* View Ride Details
* Confirm Ride Requests

---

## 📍 Live Ride Tracking

The application provides live ride tracking where users can:

* Monitor Ride Progress
* View Ride Status
* Track Current Ride Information
* Access Ride Updates

---

## 💳 Payment Module

Features include:

* Fare Calculation
* Payment Summary
* Transaction Information
* Ride Payment Processing

---

## 📜 Ride History

Users can:

* View Previous Rides
* Review Payment Records
* Access Travel History
* Monitor Completed Trips

---

## 👤 Profile Management

Users can:

* View Profile Information
* Update Personal Details
* Manage Account Settings

---

## 👨‍💼 Admin Panel

The Admin Dashboard allows administrators to manage platform users.

### CRUD Operations

#### Create User

* Add new users.

#### Read User

* View all registered users.

#### Update User

* Edit existing user details.

#### Delete User

* Remove users from the system.

### Admin Features

* User Listing
* User Creation
* User Editing
* User Deletion
* Centralized User Management

---

# 🔄 Request Flow

```plaintext
React Frontend
      │
      ▼
Controller Layer
      │
      ▼
Service Layer
      │
      ▼
DAO Layer
      │
      ▼
Repository Layer
      │
      ▼
MySQL Database
```

---

# 🔒 Security Features

* Firebase Authentication
* OTP Verification
* Protected Routes
* Input Validation
* REST API Security
* Secure User Sessions

---

# 🗄️ Database

The application uses MySQL for storing:

### Users

* User ID
* Name
* Email
* Authentication Details

### Ride Booking

* Ride ID
* Pickup Location
* Destination
* Fare
* Status
* Booking Timestamp

---

# 🚀 Installation & Setup

## Clone Repository

```bash
git clone <repository-url>
cd project
```

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```plaintext
http://localhost:5173
```

## Backend Setup

```bash
cd backend
mvn spring-boot:run
```

Backend runs on:

```plaintext
http://localhost:8080
```

## Database Setup

Configure MySQL credentials inside:

```properties
application.properties
```

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/agrides
spring.datasource.username=root
spring.datasource.password=password
spring.jpa.hibernate.ddl-auto=update
```

---

# 🧪 API Testing

REST APIs can be tested using:

* Postman
* Thunder Client
* Swagger (Future Enhancement)

---

# 📱 Responsive Design

The application supports:

* Desktop
* Laptop
* Tablet
* Mobile Devices

---

# 🔮 Future Enhancements

* Google Maps Integration
* Real-Time Driver Tracking
* Push Notifications
* Ride Scheduling
* Online Payment Gateway
* Driver Module
* Analytics Dashboard
* Multi-Language Support
* Dark Mode
* In-App Chat

---

# 📈 Project Highlights

✅ React + Vite Frontend

✅ Spring Boot Backend

✅ Firebase Authentication

✅ OTP Verification

✅ MySQL Database

✅ Ride Booking System

✅ Live Ride Tracking

✅ Payment Management

✅ Ride History

✅ User Profile Management

✅ Admin CRUD Operations

✅ REST API Integration

✅ Docker Support

✅ Responsive UI

---

# 👨‍💻 Author

**Nagapradeep**

Full Stack Developer

AG RIDES - Ride Sharing Application

---

# 📄 License

This project is developed for educational and learning purposes.
