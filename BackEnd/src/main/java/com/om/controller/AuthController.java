package com.om.controller;

import com.om.authService.AuthService;
import com.om.dto.UserDto;
import com.om.reqRes.AuthResp;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    public  final AuthService authService;

    @PostMapping("/register")
     public ResponseEntity<AuthResp> signUp(@RequestBody UserDto userDto)throws  Exception{
         return  ResponseEntity.ok(authService.register(userDto));
     }

    @PostMapping("/login")
    public ResponseEntity<AuthResp> login(@RequestBody UserDto userDto)throws  Exception{
        return  ResponseEntity.ok(authService.login(userDto));
    }

}
