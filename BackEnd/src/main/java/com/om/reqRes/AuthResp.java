package com.om.reqRes;

import com.om.dto.UserDto;
import com.om.modal.User;
import lombok.Data;

@Data
public class AuthResp {

    private  String jwt;
    private  String message;
    private UserDto user;
}
