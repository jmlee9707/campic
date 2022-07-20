package com.web.curation.data.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class user {

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private int userId;

    @Column(nullable = false)
    private String userName;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private String nickname;
    @Column(nullable = false)
    private String tel;
    @Column(nullable = false)
    private String birth;
    @Column(nullable = false)
    private String auth;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false)
    private String profileImg;

}
