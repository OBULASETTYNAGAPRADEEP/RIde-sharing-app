package com.example.aws.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.aws.models.Users;
import com.example.aws.service.UserService;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    UserService userService;

    // RESTful endpoints
    @PostMapping("")
    public Users createUser(@RequestBody Users user) {
        return userService.createUser(user);
    }

    @GetMapping("")
    public List<Users> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public Users getUserById(@PathVariable Integer id) {
        return userService.getUserById(id);
    }

    @PutMapping("/{id}")
    public Users updateUser(@PathVariable Integer id, @RequestBody Users user) {
        return userService.updateUser(id, user);
    }

    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Integer id) {
        boolean isDeleted = userService.deleteUser(id);
        if (isDeleted) {
            return "User with Id " + id + " was successfully deleted.";
        } else {
            return "User with id " + id + " not found.";
        }
    }

    // Legacy endpoints for compatibility
    @PostMapping("/post")
    public Object postData(@RequestBody Users user) {
        return userService.postData(
            user.getEmail(),
            user.getId(),
            user.getName()
        );
    }

    @GetMapping("/all")
    public Object getAllUsersLegacy() {
        return userService.getAllUsers();
    }

    @DeleteMapping("/delete/{id}")
    public String deleteUserLegacy(@PathVariable Integer id) {
        boolean isDeleted = userService.deleteUser(id);
        if (isDeleted) {
            return "User with Id " + id + " was successfully deleted.";
        } else {
            return "User with id " + id + " not found.";
        }
    }
}
