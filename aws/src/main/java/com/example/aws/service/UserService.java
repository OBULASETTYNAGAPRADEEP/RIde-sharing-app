package com.example.aws.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.aws.models.Users;
import com.example.aws.repository.UserRepository;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public Users createUser(Users user) {
        return userRepository.save(user);
    }

    public List<Users> getAllUsers() {
        return userRepository.findAll();
    }

    public Users getUserById(Integer id) {
        return userRepository.findById(id).orElse(null);
    }
    public Users postData(String email, Integer id, String name) {
        Users user = new Users();
        user.setEmail(email);
        user.setId(id);
        user.setName(name);
        return userRepository.save(user);
    }


    public Users updateUser(Integer id, Users updatedUser) {
        Users user = userRepository.findById(id).orElse(null);
        if (user != null) {
            user.setName(updatedUser.getName());
            user.setEmail(updatedUser.getEmail());
            // Set other fields as necessary
            return userRepository.save(user);
        }
        return null;
    }

    public boolean deleteUser(Integer id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
