package com.om.repository;

import com.om.modal.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User,Long> {

    User findByEmail(String email);
}
