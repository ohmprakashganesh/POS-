package com.om.authServiceImpl;

import com.om.Mapper.Mappings;
import com.om.authService.AuthService;
import com.om.configuration.JwtProvider;
import com.om.dto.UserDto;
import com.om.exception.CredientalsNotMatched;
import com.om.exception.UserExistException;
import com.om.exception.UserNotFountException;
import com.om.modal.Role;
import com.om.modal.User;
import com.om.repository.UserRepo;
import com.om.reqRes.AuthResp;
import com.om.serviceImpl.CustomUserImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collection;

@Service
public class AuthServiceImpl implements AuthService {
    private  final UserRepo userRepo;
    private  final PasswordEncoder passwordEncoder;
    private  final JwtProvider jwtProvider;

    public AuthServiceImpl(UserRepo userRepo, PasswordEncoder passwordEncoder, JwtProvider jwtProvider, CustomUserImpl customUserImpl) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.jwtProvider = jwtProvider;
        this.customUserImpl = customUserImpl;
    }

    private  final CustomUserImpl customUserImpl;

    @Override
    public AuthResp register(UserDto userDto) {
        User user= userRepo.findByEmail(userDto.getEmail());
        if(user != null){
            throw new UserExistException("email is already exist");
        }
        if(userDto.getRole().equals(Role.ADMIN)){
            throw new UserExistException("user exist already");
        }

        User user1= Mappings.dtoToUser(userDto);
        user1.setPassword(passwordEncoder.encode(user1.getPassword()));

       User user2= userRepo.save(user1);

        Authentication authentication= new UsernamePasswordAuthenticationToken(userDto.getEmail(), userDto.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt= jwtProvider.generateToken(authentication);

        AuthResp authResp= new AuthResp();
        authResp.setMessage("registed sucesfully");
        authResp.setJwt(jwt);
        authResp.setUser(Mappings.userToDto(user2));
        return  authResp;
    }

    @Override
    public AuthResp login(UserDto userDto) {
        Authentication authentication = authenticate(userDto.getEmail(), userDto.getPassword());

         SecurityContextHolder.getContext().setAuthentication(authentication);
            Collection<? extends GrantedAuthority> authorities= authentication.getAuthorities();

            String role= authorities.iterator().next().getAuthority();

            String jwt= jwtProvider.generateToken(authentication);

            User user= userRepo.findByEmail(userDto.getEmail());

            user.setLastLogin(LocalDateTime.now());
            User user1= userRepo.save(user);

            AuthResp authResp= new AuthResp();
            authResp.setMessage("login successfully");
            authResp.setJwt(jwt);
            authResp.setUser(Mappings.userToDto(user1));
            return  authResp;

    }

    private Authentication authenticate(String email, String password) {
        UserDetails userDetails= customUserImpl.loadUserByUsername(email);
        if(userDetails ==null){
            throw new UserNotFountException("user not found with the email "+ email);
        }
        if(!passwordEncoder.matches(password,userDetails.getPassword())){
            throw new CredientalsNotMatched("password not matchec");
        }


        return  new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
    }
}
