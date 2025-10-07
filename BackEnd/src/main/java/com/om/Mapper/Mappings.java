package com.om.Mapper;

import com.om.dto.UserDto;
import com.om.modal.User;

public class Mappings {

    public  static UserDto userToDto(User user){
        UserDto userDto= new UserDto();
        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setPhone(user.getPhone());
        userDto.setEmail(user.getEmail());
        userDto.setPassword(user.getPassword());
        userDto.setCreatedAt(user.getCreatedAt());
        userDto.setLastLogin(user.getLastLogin());
        userDto.setUpdatedAt(user.getUpdatedAt());
        userDto.setRole(user.getRole());
        return  userDto;
    }

    public  static User dtoToUser(UserDto userDto){
        User user= new User();
        user.setId(user.getId());
        user.setName(userDto.getName());
        user.setPhone(userDto.getPhone());
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());
        user.setCreatedAt(userDto.getCreatedAt());
        user.setLastLogin(userDto.getLastLogin());
        user.setUpdatedAt(userDto.getUpdatedAt());
        user.setRole(userDto.getRole());
        return  user;
    }
}
