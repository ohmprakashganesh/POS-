package com.om.controller;

import com.om.Mapper.Mappings;
import com.om.dto.UserDto;
import com.om.modal.User;
import com.om.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private  final UserService userService;

    @GetMapping("/profile")
    ResponseEntity<UserDto> getUserProfile(
            @RequestHeader("Authorization") String jwt
    ){
        User user= userService.getUserFromJwtToken(jwt);
        return  ResponseEntity.ok(Mappings.userToDto(user));
    }
    @GetMapping("/{id}")
    ResponseEntity<UserDto> getUserProfile(
            @PathVariable("id") Long id
    ){
        User user= userService.getUserById(id);
        return  ResponseEntity.ok(Mappings.userToDto(user));
    }
}
