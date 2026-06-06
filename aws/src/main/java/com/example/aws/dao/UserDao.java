package com.example.aws.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.aws.models.Users;

@Repository
public interface UserDao extends JpaRepository<Users, Integer>{

}