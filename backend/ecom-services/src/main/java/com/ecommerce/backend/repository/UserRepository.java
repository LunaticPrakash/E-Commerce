package com.ecommerce.backend.repository;

import com.ecommerce.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
   User findByUsername(String username);
}
