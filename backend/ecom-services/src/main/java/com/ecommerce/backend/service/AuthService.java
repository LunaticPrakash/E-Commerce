package com.ecommerce.backend.service;

import com.ecommerce.backend.common.Payment;
import com.ecommerce.backend.common.TxnResponse;
import com.ecommerce.backend.model.JwtRequest;
import com.ecommerce.backend.model.JwtResponse;
import com.ecommerce.backend.model.Order;
import com.ecommerce.backend.model.User;
import com.ecommerce.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;


    @Bean
    public RestTemplate restTemplate2(RestTemplateBuilder builder) {
        // Do any additional configuration here
        return builder.build();
    }
    @Autowired
    private RestTemplate template;

    public JwtResponse loginUser(JwtRequest jwtRequest){
        return template.postForObject("http://localhost:8082/login/", jwtRequest, JwtResponse.class);
    }

    public User registerNewUser(User user) {
        User regUser = template.postForObject("http://localhost:8082/register/", user, User.class);
        System.out.println(regUser.toString());
        System.out.println("User Registered");
        return regUser;
    }
}
