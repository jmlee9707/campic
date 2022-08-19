package com.web.curation.service;

import com.web.curation.data.dto.UserDto;
import com.web.curation.data.entity.RoleType;
import com.web.curation.data.entity.User;

public interface MemberService {

    boolean register(UserDto registerDto);
    UserDto login(UserDto loginUser) throws RuntimeException;

    UserDto userInfo(String email);
    String getRefreshToken(String email);
    RoleType getRole(String email);
    boolean deleteUser(String email);

    boolean updateUser(UserDto userDto);

    boolean updateUserProfile(UserDto userDto);

    boolean updatePsssword(String email, String password);

    boolean checkPassword(String email, String password);

    String findId(String tel);

}
