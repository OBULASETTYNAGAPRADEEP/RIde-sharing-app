package com.example.aws.service;

import com.example.aws.dao.RideBookingDao;
import com.example.aws.models.RideBooking;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RideBookingService {

    @Autowired
    private RideBookingDao rideBookingDao;

    public RideBooking bookRide(RideBooking rideBooking) {
        return rideBookingDao.save(rideBooking);
    }

    public List<RideBooking> getRideHistory(Long userId) {
        return rideBookingDao.findByUser_Id(userId);
    }
}
