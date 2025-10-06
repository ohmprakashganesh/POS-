package com.om.service;

import com.om.modal.User;

import java.util.List;

public interface UserService {
    User getUserFromJwtToken(String token);
    User getCurrentUser();
    User getUserByEmail(String email);
    User getUserById(Long id);
    List<User> getAllUsers();
}
