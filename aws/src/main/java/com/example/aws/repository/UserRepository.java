package com.example.aws.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.aws.models.Users;

@Repository
public interface UserRepository extends JpaRepository<Users, Integer> {}
