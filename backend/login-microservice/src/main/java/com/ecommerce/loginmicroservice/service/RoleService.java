package com.ecommerce.loginmicroservice.service;

import com.ecommerce.loginmicroservice.entity.Role;
import com.ecommerce.loginmicroservice.repository.RoleDao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {

    @Autowired
    private RoleDao roleDao;

    public Role createNewRole(Role role) {
        return roleDao.save(role);
    }
}
