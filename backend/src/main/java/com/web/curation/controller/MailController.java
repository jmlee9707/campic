package com.web.curation.controller;

import com.web.curation.data.dto.UserDto;
import com.web.curation.service.MailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/email")
public class MailController {

    private final Logger LOGGER = LoggerFactory.getLogger(MailController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private final MailService mailService;

    @Autowired
    public MailController(MailService mailService) {
        this.mailService = mailService;
    }

    @GetMapping("/send/{email}")
    public ResponseEntity<Map<String, Object>> sendEmail(@PathVariable String email) {
        LOGGER.debug("sendEmail - 호출");
        Map<String, Object> resultMap = new HashMap<>();

        String result = null;
        HttpStatus status = HttpStatus.OK;
        try{
            String emailCode = mailService.makeRand();
            result = mailService.senEmail(email);

            resultMap.put("emailCode", emailCode);
            resultMap.put("message", result);

        } catch (Exception e){
            resultMap.put("message", FAIL);
            status = HttpStatus.BAD_REQUEST;
        }

        return new ResponseEntity<>(resultMap, status);
    }

    @GetMapping("/verify/{userCode}")
    public ResponseEntity<String> verifyEmail(@PathVariable String userCode, HttpServletRequest request) {
        LOGGER.debug("verifyEmail - 호출");

        String value = request.getHeader("emailCode");

        if(MailService.verifyEmail(userCode, value)){
            return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
        }

        return new ResponseEntity<>(FAIL, HttpStatus.BAD_REQUEST);
    }
}
