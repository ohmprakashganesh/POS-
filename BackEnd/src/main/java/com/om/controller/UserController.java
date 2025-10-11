package com.om.controller;

import com.om.Mapper.Mappings;
import com.om.dto.UserDto;
import com.om.modal.User;
import com.om.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private  final UserService userService;

    @GetMapping("/profile")
    ResponseEntity<UserDto> getUserProfile(
    ){
        User user= userService.getCurrentUser();
        return  ResponseEntity.ok(Mappings.userToDto(user));
    }
    @GetMapping("/{id}")
    ResponseEntity<UserDto> findByUserId(
            @PathVariable("id") Long id
    ){
        User user= userService.getUserById(id);
        return  ResponseEntity.ok(Mappings.userToDto(user));
    }
    @GetMapping("/all")
    ResponseEntity< List<UserDto> >findAll(
    ){
      List<User> user= userService.getAllUsers();
        return  ResponseEntity.ok(user.stream().map(Mappings::userToDto).collect(Collectors.toList()));
    }
}
