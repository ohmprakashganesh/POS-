package com.om.authService;

import com.om.dto.UserDto;
import com.om.reqRes.AuthReq;
import com.om.reqRes.AuthResp;

public interface AuthService {

    AuthResp register(UserDto userDto);
    AuthResp  login(UserDto userDto);

}
