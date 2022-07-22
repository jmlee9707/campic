package com.web.curation.controller;

import com.web.curation.config.security.JwtTokenProvider;
import com.web.curation.data.dto.UserDto;
import com.web.curation.service.MemberService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
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
    public ResponseEntity<String> registerMember(@RequestBody UserDto registerDto) throws Exception {
        LOGGER.debug("registerMember - 호출");
        LOGGER.debug("registerDto.getUsername() : {}", registerDto.getUserName());

        if (memberService.register(registerDto)) {
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody UserDto userDto) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        try {
            LOGGER.info("[signIn] 로그인을 시도하고 있습니다. id : {}, pw : ****", userDto.getEmail());
            UserDto loginUser = memberService.login(userDto);

            if (loginUser != null) {

                LOGGER.info("[signIn] 정상적으로 로그인되었습니다. id : {}, token : {}", userDto.getEmail(), loginUser.getToken());

                resultMap.put("access-token", loginUser.getToken());
                resultMap.put("message", SUCCESS);

                status = HttpStatus.ACCEPTED;

            } else {

                resultMap.put("message", FAIL);
                status = HttpStatus.ACCEPTED;
            }
        } catch (Exception e) {

            LOGGER.error("로그인 실패 : {}", e);
            resultMap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    // 회원정보 가져오기
    @GetMapping("/{email}")
    public ResponseEntity<Map<String, Object>> getInfo(@PathVariable("email") String email, HttpServletRequest request) {

		LOGGER.debug("email : {} ", email);

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;

        if (jwtTokenProvider.validateToken(request.getHeader("access-token"))) {
            LOGGER.info("사용 가능한 토큰!!!");
            try {
//				로그인 사용자 정보.
                UserDto userDto = memberService.userInfo(email);
                resultMap.put("userInfo", userDto);
                resultMap.put("message", SUCCESS);
                status = HttpStatus.ACCEPTED;
            } catch (Exception e) {
                LOGGER.error("정보조회 실패 : {}", e);
                resultMap.put("message", e.getMessage());
                status = HttpStatus.INTERNAL_SERVER_ERROR;
            }
        } else {
            LOGGER.error("사용 불가능 토큰!!!");
            resultMap.put("message", FAIL);
            status = HttpStatus.ACCEPTED;
        }

        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }
    // 회원 탈퇴
    @DeleteMapping("{email}")
    public ResponseEntity<String> deleteMember(@PathVariable("email") String email) throws Exception {
        LOGGER.debug("deleteUser - 호출");

        if (memberService.deleteUser(email)) {
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
    }

    // 회원정보 수정
    @PutMapping("/info")
    public ResponseEntity<String> updateMember(@RequestBody UserDto userDto) {
        LOGGER.debug("updateUser - 호출");

        if (memberService.updateUser(userDto)) {
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
    }

    // 비밀번호 변경
    // 비밀번호가 포함되어 있어서 body로 받을 것임
    @PutMapping({"{email}"})
    public ResponseEntity<String> updatePassword(@RequestBody UserDto userDto) {
        LOGGER.info("updatePassword 호출");

        if(memberService.updatePsssword(userDto.getEmail(), userDto.getPassword())){
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
    }

    // 비밀번호 확인
    @GetMapping("/check")
    public ResponseEntity<String> checkPassword(@RequestBody UserDto userDto){
        LOGGER.info("checkPassword 호출");

        if(memberService.checkPassword(userDto.getEmail(), userDto.getPassword())){
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
    }

}
