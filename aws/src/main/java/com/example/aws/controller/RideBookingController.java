package com.example.aws.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.aws.models.RideBooking;
import com.example.aws.service.RideBookingService;
import com.example.aws.models.Users;
import com.example.aws.service.UserService;

@RestController
@RequestMapping("/api/ride-booking")
public class RideBookingController {

    @Autowired
    private RideBookingService rideBookingService;

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<?> bookRide(@RequestBody RideBooking rideBooking) {
        try {
            Users user = userService.getUserById(rideBooking.getUser().getId());
            if (user == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User not found.");
            }

            rideBooking.setUser(user);
            RideBooking savedRide = rideBookingService.bookRide(rideBooking);
            return ResponseEntity.ok(savedRide);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error booking ride: " + e.getMessage());
        }
    }

    @GetMapping("/history")
    public ResponseEntity<?> getRideHistory(@RequestParam Long userId) {
        try {
            List<RideBooking> rideHistory = rideBookingService.getRideHistory(userId);
            if (rideHistory.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No ride history found.");
            }
            return ResponseEntity.ok(rideHistory);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching ride history: " + e.getMessage());
        }
    }
}
