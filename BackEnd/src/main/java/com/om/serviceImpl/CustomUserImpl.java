package com.om.serviceImpl;

import com.om.modal.User;
import com.om.repository.UserRepo;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;
@Service
public class CustomUserImpl implements UserDetailsService {

    private  UserRepo userRepo;
    public  CustomUserImpl(UserRepo userRepo){
        this.userRepo=userRepo;
    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user= userRepo.findByEmail(username);

        if(user==null){
            throw  new UsernameNotFoundException("User not found");
        }

        GrantedAuthority authority= new SimpleGrantedAuthority(
                user.getRole().toString()
        );

        Collection<GrantedAuthority> authorities=
                Collections.singletonList(authority);

        return new  org.springframework.security.core.userdetails.User(
                user.getEmail(),user.getPassword(),authorities
        );

    }
}
