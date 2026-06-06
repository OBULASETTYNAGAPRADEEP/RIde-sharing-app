package com.example.aws.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.aws.models.RideBooking;

public interface RideBookingDao extends JpaRepository<RideBooking, Long> {
    List<RideBooking> findByUser_Id(Long userId);
}
