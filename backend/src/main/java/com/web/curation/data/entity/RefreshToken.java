package com.web.curation.data.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "refresh_token_id")
    private Long id; // userId

    private String userId;
    private String token;

    private RefreshToken(String userId, String token) {
        this.userId = userId;
        this.token = token;
    }

    public static RefreshToken createToken(String userId, String token){
        return new RefreshToken(userId, token);
    }

    public void changeToken(String token) {
        this.token = token;
    }
}
