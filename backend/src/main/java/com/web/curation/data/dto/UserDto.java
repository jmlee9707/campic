package com.web.curation.data.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class UserDto {

    private String email;

    private String nickname;

    private String password;

    private String tel;

    private String birth;

    private String profileImg;

    private LocalDateTime joinDate;

    private String auth;

    private String token;
}
