package com.web.curation.controller;

import com.web.curation.config.security.JwtTokenProvider;
import com.web.curation.data.entity.User;
import com.web.curation.data.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/token")
public class TokenController {

    private final Logger LOGGER = LoggerFactory.getLogger(TokenController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;

    @Autowired
    public TokenController(JwtTokenProvider jwtTokenProvider, UserRepository userRepository) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.userRepository = userRepository;
    }

    @PostMapping("/silentRefresh")
    public ResponseEntity<Map<String, Object>> login(@RequestBody HashMap<String, String> refreshToken) {
        LOGGER.info("[silentRefresh] 실행");
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.OK;
        String refresh = refreshToken.get("refreshToken");
        LOGGER.info("refreshtoken 맞아? {}", refresh);

//        String refreshToken = jwtTokenProvider.resolveToken(request, "refreshToken");
        String sliceRefresh = null;
        if (refresh != null && refresh.startsWith("Bearer-")) {
            sliceRefresh = refresh.substring(7);

        } else {
            status = HttpStatus.UNAUTHORIZED;
            resultMap.put("message", FAIL);
            return new ResponseEntity<>(resultMap, status);
        }

        // 리프레시 토큰이 유효하면
        if(jwtTokenProvider.validateToken(sliceRefresh).equals("ACCESS")){
            LOGGER.info("refreshToken 유효하니");
            // 새로운 refreshToken과 accessToken을 리턴한다.
            String newRefresh = jwtTokenProvider.reissueRefreshToken(sliceRefresh);
            LOGGER.info("refreshToken {}", newRefresh);

            String email = jwtTokenProvider.getUsername(newRefresh);
            User user = userRepository.getByEmail(email);
            String newAccess = jwtTokenProvider.createAccessToken(email, user.getRoleType());
            LOGGER.info("new access & refresh 재발급 완료");

            Authentication authentication = jwtTokenProvider.getAuthentication(newAccess);
            SecurityContextHolder.getContext().setAuthentication(authentication);

            LOGGER.info("accessToken {}", newAccess);

            resultMap.put("accessToken", newAccess);
            resultMap.put("refreshToken", newRefresh);
            resultMap.put("message", SUCCESS);

            return new ResponseEntity<>(resultMap, status);
        }
        status = HttpStatus.UNAUTHORIZED;
        resultMap.put("message", FAIL);

        return new ResponseEntity<>(resultMap, status);
    }
}
