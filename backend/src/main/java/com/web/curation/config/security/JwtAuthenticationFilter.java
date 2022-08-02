package com.web.curation.config.security;

import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.web.curation.data.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

// JWT 토큰으로 인증하고 SecurityContextHolder에 추가하는 필터를 설정하는 클래스
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final Logger LOGGER = LoggerFactory.getLogger(JwtAuthenticationFilter.class);
    private final JwtTokenProvider jwtTokenProvider;

    public JwtAuthenticationFilter(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest servletRequest,
                                    HttpServletResponse servletResponse,
                                    FilterChain filterChain) throws ServletException, IOException {
        String token = jwtTokenProvider.resolveToken(servletRequest);
        LOGGER.info("[doFilterInternal] token 값 추출 완료. token : {}", token);

        LOGGER.info("[doFilterInternal] token 값 유효성 체크 시작");
        if (token != null && jwtTokenProvider.validateToken(token).equals("ACCESS")) {
            // 토큰이 유효하면 토큰으로부터 유저 정보를 받아오기
            Authentication authentication = jwtTokenProvider.getAuthentication(token);
            // SecurityContext에 Authentication 객체를 저장
            SecurityContextHolder.getContext().setAuthentication(authentication);
            LOGGER.info("set Authentication to security context for '{}', uri: {}",
                    authentication.getName(), servletRequest.getRequestURI());
        }
        // 액세스 토큰 만료가 되면 리프레시 토큰 새로 발급 해준다
        else if(token != null && jwtTokenProvider.validateToken(token).equals("EXPIRED")){

            // 쿠키에서 리프레시 토큰 가져오기
            String refresh = null;
            try {
                refresh = jwtTokenProvider.resolveRefreshToken(servletRequest);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }

            // refreshToken 확인해서 재발급 해준다.
            if(refresh != null && jwtTokenProvider.validateToken(refresh).equals("ACCESS")){
                String newRefresh = jwtTokenProvider.reissueRefreshToken(refresh);

                if(newRefresh != null){

                    // 리프레시 토큰 헤더에 저장하기
                    servletResponse.setHeader("refreshToken", newRefresh);
//                    Cookie cookie = new Cookie("refreshToken", newRefresh);
//                    cookie.setMaxAge(7 * 24 * 60 * 60);
////                    cookie.setSecure(true);
////                    cookie.setHttpOnly(true);
//                    cookie.setPath("/");
//
//                    servletResponse.addCookie(cookie);

                    // accessToken 다시 발급
                    String email = jwtTokenProvider.getUsername(newRefresh);

                    String newAccess = jwtTokenProvider.createAccessToken(email);

                    servletResponse.setHeader("accessToken", newAccess);

                    Authentication authentication = jwtTokenProvider.getAuthentication(newAccess);
                    SecurityContextHolder.getContext().setAuthentication(authentication);

                    LOGGER.info("refreshToken & accessToken 재발행");
                }
            }
        } else {
            LOGGER.info("no valid JWT token found, uri: {}", servletRequest.getRequestURI());
        }

        filterChain.doFilter(servletRequest, servletResponse);
        // doFilter() 메소드를 기준으로
        // 앞에 작성한 코드는 서블릿이 실행되기 전에 실행
        // 뒤에 작성한 코드는 서블릿이 실행된 후에 실행된다.
    }
}
