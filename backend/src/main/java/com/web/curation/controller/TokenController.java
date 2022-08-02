package com.web.curation.controller;

import com.web.curation.config.security.JwtTokenProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/token")
public class TokenController {

    private final Logger LOGGER = LoggerFactory.getLogger(MemberController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private final JwtTokenProvider jwtTokenProvider;

    public TokenController(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @PostMapping("/silentRefresh")
    public ResponseEntity<Map<String, Object>> login(HttpServletRequest request) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        String refreshToken = request.getHeader("refreshToken");

        // 리프레시 토큰이 유효하면
        if(jwtTokenProvider.validateToken(refreshToken).equals("ACCESS")){
            // 새로운 refreshToken과 accessToken을 리턴한다.
            String newRefresh = jwtTokenProvider.reissueRefreshToken(refreshToken);

            String email = jwtTokenProvider.getUsername(newRefresh);
            String newAccess = jwtTokenProvider.createAccessToken(email);

            Authentication authentication = jwtTokenProvider.getAuthentication(newAccess);
            SecurityContextHolder.getContext().setAuthentication(authentication);

            resultMap.put("accessToken", newAccess);
            resultMap.put("refreshToken", newRefresh);
            resultMap.put("message", SUCCESS);

//            resultMap.put("accessToken", request.getHeader("accessToken"));
//            resultMap.put("accessToken", request.getHeader("refreshToken"));
//            resultMap.put("message", SUCCESS);

            return new ResponseEntity<>(resultMap, status);
        }

        resultMap.put("message", FAIL);

        return new ResponseEntity<>(resultMap, status);
    }
}
