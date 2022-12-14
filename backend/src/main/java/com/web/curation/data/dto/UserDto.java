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

    private byte[] profileImg;

    private String blobProfile;

    private LocalDateTime joinDate;

    private String auth;

    private String accessToken;

    private String refreshToken;

    private String isSocial;
}
