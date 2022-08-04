package com.web.curation.service;

import com.web.curation.config.security.JwtTokenProvider;
import com.web.curation.data.dto.UserDto;
import com.web.curation.data.entity.User;
import com.web.curation.data.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

@Service
public class SocialService {
    private final Logger LOGGER = LoggerFactory.getLogger(SocialService.class);
    private final UserRepository userRepository;

    @Autowired
    public SocialService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // 카카오 유저 정보 들고오기 서비스
    public void kakaoUser(String token){
        String reqURL = "https://kapi.kakao.com/v2/user/me";

        // access_token을 이용하여 사용자 정보 조회
        try{
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("POST");
            conn.setDoOutput(true);
            conn.setRequestProperty("Authorization", "Bearer " + token); //전송할 header 작성, access_token전송

            int responseCode = conn.getResponseCode();
            LOGGER.info("responsecode, {}", responseCode);

            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while((line = br.readLine()) != null){
                result += line;
            }
            LOGGER.info("response body : {}", result);


        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}
