package com.om.serviceImpl;

import com.om.configuration.JwtProvider;
import com.om.exception.UserNotFountException;
import com.om.modal.User;
import com.om.repository.UserRepo;
import com.om.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private  final UserRepo userRepo;
    private  final JwtProvider jwtProvider;

    @Override
    public User getUserFromJwtToken(String token) {

        String email= jwtProvider.getEmailFromToken(token);
        User user= userRepo.findByEmail(email);
        if(user==null){
            throw new UserNotFountException("invalid token");
        }
        return user;
    }

    @Override
    public User getCurrentUser() {
        String email= SecurityContextHolder.getContext().getAuthentication().getName();
        User user= userRepo.findByEmail(email);
        if(user==null){
            throw new UserNotFountException("current user not found");
        }
        return user;
    }

    @Override
    public User getUserByEmail(String email) {
        User user= userRepo.findByEmail(email);
        if(user==null){
            throw new UserNotFountException("invalid token");
        }
        return user;
    }

    @Override
    public User getUserById(Long id) {
        User user= userRepo.findById(id).orElseThrow(()-> new UserNotFountException("user not found with id "+id));
        if(user==null){
            throw new UserNotFountException("invalid token");
        }
        return user;
    }

    @Override
    public List<User> getAllUsers() {
        return  userRepo.findAll();
    }
}
