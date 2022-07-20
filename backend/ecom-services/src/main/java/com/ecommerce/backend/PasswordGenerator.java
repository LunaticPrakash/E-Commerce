package com.ecommerce.backend;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordGenerator {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String rawPass = "12345";
        String encodedPass = encoder.encode(rawPass);
        System.out.println(encodedPass);
    }
}
