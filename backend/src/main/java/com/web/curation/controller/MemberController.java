package com.web.curation.controller;

import com.web.curation.config.security.JwtTokenProvider;
import com.web.curation.data.dto.UserDto;
import com.web.curation.service.MemberService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
//@CrossOrigin("*")
@RequestMapping("/user")
public class MemberController {
    
    private final Logger LOGGER = LoggerFactory.getLogger(MemberController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private final MemberService memberService;

    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    public MemberController(MemberService memberService, JwtTokenProvider jwtTokenProvider){
        this.memberService = memberService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    // 회원가입
    @PostMapping("/register")
    public ResponseEntity<String> registerMember(@RequestBody UserDto registerDto) {
        LOGGER.debug("registerMember - 호출");
//        LOGGER.debug("registerDto.getUsername() : {}", registerDto.getUserName());

        if (memberService.register(registerDto)) {
            return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity<>(FAIL, HttpStatus.NO_CONTENT);
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody UserDto userDto, HttpServletResponse response) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        try {
            LOGGER.info("[signIn] 로그인을 시도하고 있습니다. id : {}, pw : ****", userDto.getEmail());
            UserDto loginUser = memberService.login(userDto);

            if (loginUser != null) {

                LOGGER.info("[signIn] 정상적으로 로그인되었습니다. id : {}, token : {}", userDto.getEmail(), loginUser.getAccessToken());

                resultMap.put("Authorization", loginUser.getAccessToken());
                resultMap.put("message", SUCCESS);
                status = HttpStatus.ACCEPTED;


//                ResponseCookie responseCookieookie = ResponseCookie.from("sameSiteCookie", "sameSiteCookieValue")
//                        .domain("ifuwanna.tistory.com")
//                        .sameSite("None")
//                        .secure(true)
//                        .path("/")
//                        .build();
//                response.addHeader("Set-Cookie", responseCookieookie.toString());


                // 리프레시 토큰 쿠키에 저장하기
                resultMap.put("refreshToken", loginUser.getRefreshToken());
//                ResponseCookie cookie = ResponseCookie.from("refreshToken", loginUser.getRefreshToken())
//                        .path("/")
////                        .secure(true)
//                        .sameSite("None")
//                        .httpOnly(false)
//                        .domain("localhost")
//                        .build();
//
//                response.setHeader("Set-Cookie", cookie.toString());

//                Cookie cookie = new Cookie("refreshToken", loginUser.getRefreshToken());
//                cookie.setMaxAge(7 * 24 * 60 * 60);
////                cookie.setSecure(true);
////                cookie.setHttpOnly(true);
//                cookie.setPath("/");
//
//                response.addCookie(cookie);

            } else {

                resultMap.put("message", FAIL);
                status = HttpStatus.NO_CONTENT;
            }
        } catch (Exception e) {

            LOGGER.error("로그인 실패 : {}", e);
            resultMap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<>(resultMap, status);
    }

//    // 리프레시 토큰 확인 및 액세스 토큰 발급
//    @PostMapping("/refresh")
//    public ResponseEntity<Map<String,Object>> refreshToken(@RequestBody UserDto userDto, HttpServletRequest request){
//        Map<String, Object> resultMap = new HashMap<>();
//        HttpStatus status = HttpStatus.ACCEPTED;
//
//        String token = request.getHeader("refresh-token");
//        if(jwtTokenProvider.validateToken(token)){
//            resultMap.put("message", "expired");
//            status = HttpStatus.UNAUTHORIZED;
//            return new ResponseEntity<>(resultMap, status);
//        }
//
//        if(token.equals(memberService.getRefreshToken(userDto.getEmail()))){
//            String accessToken = jwtTokenProvider.createToken(userDto.getEmail(), memberService.getRole(userDto.getEmail()));
//            resultMap.put("access-token", accessToken);
//            resultMap.put("message", SUCCESS);
//        } else{
//            resultMap.put("message", FAIL);
//            status = HttpStatus.UNAUTHORIZED;
//        }
//
//        return new ResponseEntity<>(resultMap, status);
//    }

    // 회원정보 가져오기
    @GetMapping("/info/{email}")
    public ResponseEntity<Map<String, Object>> getInfo(@PathVariable("email") String email, HttpServletRequest request) {

		LOGGER.debug("email : {} ", email);

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
//				로그인 사용자 정보.
            UserDto userDto = memberService.userInfo(email);
            resultMap.put("userInfo", userDto);
            resultMap.put("message", SUCCESS);
            status = HttpStatus.ACCEPTED;
        } catch (Exception e) {
            LOGGER.error("정보조회 실패 : {}", e);
            resultMap.put("message", e.getMessage());
            status = HttpStatus.BAD_REQUEST;
        }

        return new ResponseEntity<>(resultMap, status);
    }
    // 회원 탈퇴
    @DeleteMapping("/info/{email}")
    public ResponseEntity<String> deleteMember(@PathVariable("email") String email, HttpServletRequest request) {
        LOGGER.debug("deleteUser - 호출");

        if (memberService.deleteUser(email)) {
            return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity<>(FAIL, HttpStatus.BAD_REQUEST);
    }

    // 회원정보 수정
    @PutMapping("/info")
    public ResponseEntity<String> updateMember(@RequestBody UserDto userDto, HttpServletRequest request) {
        LOGGER.debug("updateUser - 호출");

        if (memberService.updateUser(userDto)) {
            return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity<>(FAIL, HttpStatus.NO_CONTENT);
    }
    private String uploadPath = "/home/ubuntu/app/profile/";
    @PutMapping("/info/profile")
    public ResponseEntity<String> updateMemberProfile(UserDto userDto, MultipartFile file, HttpServletRequest request) {
        LOGGER.debug("updateUserProfile - 호출");

        if(file.getContentType().startsWith("image") == false){
            LOGGER.warn("this file is not image type");
            return new ResponseEntity<String>(FAIL, HttpStatus.BAD_REQUEST);
        }

        String originalName = file.getOriginalFilename();//파일명:모든 경로를 포함한 파일이름
        String fileName = originalName.substring(originalName.lastIndexOf("//") + 1);

        LOGGER.info("fileName" + fileName);

        //UUID
        String uuid = UUID.randomUUID().toString();
        //저장할 파일 이름 중간에 "_"를 이용하여 구분
        String saveName = uploadPath + File.separator + File.separator + uuid + "_" + fileName + userDto.getEmail();

        Path savePath = Paths.get(saveName);
        //Paths.get() 메서드는 특정 경로의 파일 정보를 가져옵니다.(경로 정의하기)

        try {
            file.transferTo(savePath);
            //uploadFile에 파일을 업로드 하는 메서드 transferTo(file)
        } catch (IOException e) {
            e.printStackTrace();
            //printStackTrace()를 호출하면 로그에 Stack trace가 출력됩니다.
        }

        userDto.setProfileImg(savePath.toString());

        if (memberService.updateUserProfile(userDto)) {
            return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity<>(FAIL, HttpStatus.NO_CONTENT);
    }

    // 비밀번호 변경
    // 비밀번호가 포함되어 있어서 body로 받을 것임
    @PutMapping({"/info/pw"})
    public ResponseEntity<String> updatePassword(@RequestBody UserDto userDto, HttpServletRequest request) {
        LOGGER.info("updatePassword 호출");

        if(memberService.updatePsssword(userDto.getEmail(), userDto.getPassword())){
            return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity<>(FAIL, HttpStatus.NO_CONTENT);
    }

    // 비밀번호 확인
    @PostMapping("info/check")
    public ResponseEntity<String> checkPassword(@RequestBody UserDto userDto, HttpServletRequest request){
        LOGGER.info("checkPassword 호출");

        if(memberService.checkPassword(userDto.getEmail(), userDto.getPassword())){
            return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
        } else{
            return new ResponseEntity<>("fail", HttpStatus.BAD_REQUEST);
        }
    }

    // 이메일 찾기
    @GetMapping("/findId/{tel}")
    public ResponseEntity<Map<String, Object>> findId(@PathVariable("tel") String tel){
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.OK;

        LOGGER.info("findId 호출");
        String result = memberService.findId(tel);

        if(result.equals("fail")){
            resultMap.put("message", FAIL);
            status = HttpStatus.BAD_REQUEST;
        } else{
            resultMap.put("message", SUCCESS);
            resultMap.put("email", result);
        }
        return new ResponseEntity<>(resultMap, status);
    }
}
