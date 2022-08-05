package com.web.curation.controller;

import com.web.curation.config.security.JwtTokenProvider;
import com.web.curation.data.dto.UserDto;
import com.web.curation.data.entity.User;
import com.web.curation.service.SocialService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/social")
public class SocialController {

    private final Logger LOGGER = LoggerFactory.getLogger(SocialController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private final SocialService socialService;

    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    public SocialController(SocialService socialService,JwtTokenProvider jwtTokenProvider) {
        this.socialService = socialService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @PostMapping("/kakao")
    public ResponseEntity<Map<String, Object>> kakaoUser(@RequestBody Map<String, String> token) {
        LOGGER.debug("kakaoUser - 호출");
        Map<String, Object> resultMap = new HashMap<>();
        UserDto loginUser = null;
        
        try{
            loginUser = socialService.kakaoUser(token.get("Authorization"));
        } catch (Exception e){
            resultMap.put("message", FAIL);
            return new ResponseEntity<>(resultMap, HttpStatus.NO_CONTENT);
        }

        if (loginUser !=null) {

            resultMap.put("Authorization", loginUser.getAccessToken());
            resultMap.put("refreshToken", loginUser.getRefreshToken());
            resultMap.put("email", loginUser.getEmail());
            resultMap.put("message", SUCCESS);

            return new ResponseEntity<>(resultMap, HttpStatus.ACCEPTED);
        }

        resultMap.put("message", FAIL);
        return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
    }

}
