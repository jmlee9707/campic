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

    @PostMapping("/register")
    public ResponseEntity<String> registerMember(@RequestBody UserDto registerDto) throws Exception {
        LOGGER.debug("registerMember - 호출");
        LOGGER.debug("registerDto.getUsername() : {}", registerDto.getUserName());

        if (memberService.register(registerDto)) {
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody UserDto memberDto) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        try {
            LOGGER.info("[signIn] 로그인을 시도하고 있습니다. id : {}, pw : ****", memberDto.getEmail());
            UserDto loginUser = memberService.login(memberDto);

            if (loginUser != null) {

                LOGGER.info("[signIn] 정상적으로 로그인되었습니다. id : {}, token : {}", memberDto.getEmail(), loginUser.getToken());

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

    @GetMapping("/{userid}")
    public ResponseEntity<Map<String, Object>> getInfo(@PathVariable("userid") String userid, HttpServletRequest request) {

		LOGGER.debug("userid : {} ", userid);

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;

        if (jwtTokenProvider.validateToken(request.getHeader("access-token"))) {
            LOGGER.info("사용 가능한 토큰!!!");
            try {
//				로그인 사용자 정보.
                UserDto userDto = memberService.userInfo(userid);
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
}
