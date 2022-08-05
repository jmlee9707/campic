package com.web.curation.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.web.curation.config.security.JwtTokenProvider;
import com.web.curation.data.dto.UserDto;
import com.web.curation.data.entity.RoleType;
import com.web.curation.data.entity.User;
import com.web.curation.data.repository.RefreshTokenRepository;
import com.web.curation.data.repository.UserRepository;
import lombok.extern.java.Log;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class SocialService {
    private final Logger LOGGER = LoggerFactory.getLogger(SocialService.class);
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public SocialService(UserRepository userRepository, JwtTokenProvider jwtTokenProvider, RefreshTokenRepository refreshTokenRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtTokenProvider = jwtTokenProvider;
        this.refreshTokenRepository = refreshTokenRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // 카카오 유저 정보 들고오기 서비스
    public UserDto kakaoUser(String token){
        String id = null;
//        String email = "ssafy@kakao.com";
        String nickname =null;
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

            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(result);

            id = jsonNode.get("id").asText();
//            email = jsonNode.get("kakao_account").get("email").asText();
            nickname = jsonNode.get("properties")
                    .get("nickname").asText();
            br.close();


        } catch (IOException e) {
            e.printStackTrace();
        }

        UserDto userDto = registerOrLogin(id, nickname);

        return userDto;
    }
    public UserDto naverUser(String token){
        String id = null;
//        String email = null;
        String nickname =null;
        String reqURL = "https://openapi.naver.com/v1/nid/me";

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

            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(result);

            id = jsonNode.get("response").get("id").asText();
//            email = jsonNode.get("email").asText();
            nickname = jsonNode.get("response").get("name").asText();

            LOGGER.info("id : {}, name : {}", id, nickname);
            br.close();


        } catch (IOException e) {
            e.printStackTrace();
        }

        UserDto userDto = registerOrLogin(id, nickname);

        return userDto;
    }
    public UserDto googleUser(String token){
        String id = null;
//        String email = null;
        String nickname =null;
        String reqURL = "https://oauth2.googleapis.com/tokeninfo";
        reqURL += "?id_token="+token;

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

            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(result);

            id = jsonNode.get("id").asText();
//            email = jsonNode.get("email").asText();
            nickname = jsonNode.get("name").asText();
            br.close();

        } catch (IOException e) {
            e.printStackTrace();
        }
        UserDto userDto = registerOrLogin(id, nickname);

        return userDto;
    }

    private UserDto registerOrLogin(String id, String nickname){
        // 회원가입 또는 로그인 시키기

        // DB에 중복되는 email 있는지 확인
        boolean isUser = userRepository.existsByEmail(id);

        // 회원아니면 회원가입 시키기
        if(!isUser){

            // 회원가입
            // password: random UUID
            String password = UUID.randomUUID().toString();
            String encodedPassword = passwordEncoder.encode(password);

            User user = new User();
            user.setEmail(id);
            user.setNickname(nickname);
            user.setPassword(encodedPassword);
            user.setRoleType(RoleType.ROLE_USER);
            user.setTel("");
            user.setBirth("");
            user.setProfileImg("img");
            user.setJoinDate(LocalDateTime.now());

            userRepository.save(user);
        }

        // 로그인 시키기
        UserDto userDto = new UserDto();

        String access = jwtTokenProvider.createAccessToken(id, RoleType.ROLE_USER);

        Authentication authentication = jwtTokenProvider.getAuthentication(access);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String refresh = jwtTokenProvider.createRefreshToken(id);

        userDto.setAccessToken(access);
        userDto.setRefreshToken(refresh);
        userDto.setEmail(id);

        return userDto;
    }
}
