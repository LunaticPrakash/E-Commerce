package com.ecommerce.backend.controller;


import com.ecommerce.backend.model.JwtRequest;
import com.ecommerce.backend.model.JwtResponse;
import com.ecommerce.backend.model.User;
import com.ecommerce.backend.repository.UserRepository;

import com.ecommerce.backend.service.AuthService;
import com.ecommerce.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping
public class UserController {

    public static final String DEFAULT_ROLE = "ROLE_USER";
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;

    @Autowired AuthService authService;

//    @PostConstruct
//    public void initRoleAndUser() {
//        userService.initRoleAndUser();
//    }


    @GetMapping("/admin/users")
    @PreAuthorize("hasRole('Admin')")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping("/register")
    public User registerNewUser(@RequestBody User user) {
        return authService.registerNewUser(user);
    }

    @PostMapping("/login")
    public JwtResponse createJwtToken(@RequestBody JwtRequest jwtRequest) throws Exception {
        System.out.println(jwtRequest.toString());
        return authService.loginUser(jwtRequest);
    }


}
