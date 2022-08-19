package com.web.curation.config.security;

import com.web.curation.data.entity.RefreshToken;
import com.web.curation.data.entity.RoleType;
import com.web.curation.data.repository.RefreshTokenRepository;
import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Collection;
import java.util.Date;

@Component
@RequiredArgsConstructor
public class JwtTokenProvider {
    private final Logger LOGGER = LoggerFactory.getLogger(JwtTokenProvider.class);
    private final UserDetailsService userDetailsService;
    private final RefreshTokenRepository refreshTokenRepository;

    @Value("${spring.jwt.secret}")
    private String secretKey = "secretKey";
    private final long accessTokenValidMillisecond = 1000L * 30; // 1시간 유효 토큰
    private final long refreshTokenValidMillisecond = 1000L * 60 * 60 * 24 * 14; // 2주 유효 토큰

    // JwtTokenProvider 시작될 때 초기화
    @PostConstruct
    protected void init(){
        LOGGER.info("[init] JwtTokenProvider 내 secretKey 초기화 시작");
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes(StandardCharsets.UTF_8));
        LOGGER.info("[init] JwtTokenProvider 내 secretKey 초기화 완료");
    }

    //JWT access-token 생성
    public String createAccessToken(String email, RoleType roleType){
        LOGGER.info("[createToken] 토큰 생성 시작");
        Claims claims = Jwts.claims().setSubject(email);

        claims.put("role", roleType);
        Date now = new Date();

        String token = Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + accessTokenValidMillisecond))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();

        LOGGER.info("[createToken] 토큰 생성 완료");
        return token;
    }

    //JWT refresh-token 생성
    @Transactional
    public String createRefreshToken(String email){

        LOGGER.info("[createRefreshToken] 토큰 생성 시작");
        Claims claims = Jwts.claims().setSubject(email);

//        claims.put("role", "");
        Date now = new Date();

        String token = Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + refreshTokenValidMillisecond))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();

        RefreshToken findRefreshToken = refreshTokenRepository.findByUserId(email)
                .orElse(RefreshToken.createToken(email, token));

        findRefreshToken.changeToken(token);
        refreshTokenRepository.save(findRefreshToken);

        LOGGER.info("[createRefreshToken] 토큰 생성 완료");
        return token;
    }

    // 토큰 인증 정보 조회
    public Authentication getAuthentication(String token){
        LOGGER.info("[getAuthentication] 토큰 인증 정보 조회 시작");

        UserDetails userDetails = userDetailsService.loadUserByUsername(this.getUsername(token));

        LOGGER.info("[getAuthentication] 토큰 인증 정보 조회 완료, UserDetails UserName : {}", userDetails.getUsername());
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    // JWT 토큰에서 회원 구별 정보 추출
    public String getUsername(String token) {
        LOGGER.info("[getUsername] 토큰 기반 회원 구별 정보 추출");
        String info = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
        LOGGER.info("[getUsername] 토큰 기반 회원 구별 정보 추출 완료, info : {}", info);
        return info;
    }

    /**
     * HTTP Request Header에 설정된 토큰 값을 가져옴
     * 헤더에 있는 토큰 값 가져오기
     * @param request Http Request Header
     * @return String type Token 값
     */
    public String resolveToken(HttpServletRequest request, String header) {
        String bearerToken = request.getHeader(header);
        if (bearerToken != null && bearerToken.startsWith("Bearer-")) {
            return bearerToken.substring(7);
        }
        return null;
    }
//    public String resolveToken(HttpServletRequest request) {
//        LOGGER.info("[resolveToken] HTTP 헤더에서 accessToken 값 추출");
//
//        return request.getHeader("accessToken");
//    }
//    // 리프레시 토큰은 쿠키에서 가져와야 됨!!
//    public String resolveRefreshToken(HttpServletRequest request) throws Exception {
//        LOGGER.info("[resolveRefreshToken] 쿠키에서 refreshToken 값 추출");
//        String refreshToken = getCookie(request, "refreshToken");
//
//        return refreshToken;
//    }

    // 쿠키에 있는 값 가져오기
    public String getCookie(HttpServletRequest request, String key) throws Exception {
        LOGGER.info("쿠키에 있는 값 가져오겠다..");
        Cookie[] cookies = request.getCookies();
        if(key == null) return null;
        String value = "";
        if(cookies != null){
            LOGGER.info("쿠키가 있니?");
            for(int i=0;i<cookies.length;i++){
                if(key.equals(cookies[i].getName())){
                    value = java.net.URLDecoder.decode(cookies[i].getValue(), "UTF-8");
                    break;
                }
            }
        }

        return value;
    }
    // 쿠키 삭제하기
    public void delCookie(HttpServletResponse response, String key) throws Exception {
//		Cookie cookie = new Cookie("cookie"+key, java.net.URLEncoder.encode(value.toString(), "UTF-8"));

        Cookie cookie = new Cookie(key, "0");
        cookie.setMaxAge(0);
//		cookie.setPath("/");
        response.addCookie(cookie);
    }

    // 리프레시 토큰 재발급하기
    @Transactional
    public String reissueRefreshToken(String refreshToken) throws RuntimeException{
        // refresh token을 디비에 있는 값과 비교해보기
        Authentication authentication = getAuthentication(refreshToken);
        RefreshToken findRefreshToken = refreshTokenRepository.findByUserId(authentication.getName())
                .orElseThrow(() -> new UsernameNotFoundException("userId : " + authentication.getName() + " was not found"));

        if(findRefreshToken.getToken().equals(refreshToken)){

            // 새로운 리프레시 토큰 생성해서 반환
            String newRefreshToken = createRefreshToken(authentication.getName());
            findRefreshToken.changeToken(newRefreshToken);
            return newRefreshToken;
        }
        else {
            LOGGER.info("refresh 토큰이 일치하지 않습니다. ");
            return null;
        }
    }

    public String validateToken(String token) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            return "ACCESS";
        } catch (ExpiredJwtException e){
            // 만료된 경우에는 refresh token을 확인하기 위해
            return "EXPIRED";
        } catch (JwtException | IllegalArgumentException e) {
            LOGGER.info("jwtException : {}", e);
        }
        return "DENIED";
    }
}
