package com.ecommerce.loginmicroservice.repository;

import com.ecommerce.loginmicroservice.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDao extends JpaRepository<Users, Long> {
    Users findByUsername(String username);

}
