package com.web.curation.service;

import com.web.curation.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.concurrent.ThreadLocalRandom;

@Service
public class MailService {

    private final JavaMailSender javaMailSender;

    private final UserRepository userRepository;

    @Autowired
    public MailService(JavaMailSender javaMailSender, UserRepository userRepository) {
        this.javaMailSender = javaMailSender;
        this.userRepository = userRepository;
    }

    // 메일 보내기
    public String sendEmail(String email, String emailCode){
        // 메일 중복 체크
        if(userRepository.existsByEmail(email)){
//            System.out.println("메일 중복 "+email);
            return "duplicate";
        } else {
            // 메일 보내기
            SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
            simpleMailMessage.setTo(email);

            simpleMailMessage.setSubject("백야호 회원가입 인증 메일");
            simpleMailMessage.setText(emailCode);

            javaMailSender.send(simpleMailMessage);
            return "success";
        }
    }

    // 메일 보내기
    public String sendEmailForPw(String email, String emailCode){
        // 메일 중복 체크
        if(userRepository.existsByEmail(email)){
            // 메일 보내기
            SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
            simpleMailMessage.setTo(email);

            simpleMailMessage.setSubject("백야호 비밀번호 찾기 인증 메일");
            simpleMailMessage.setText(emailCode);

            javaMailSender.send(simpleMailMessage);
            return "success";
        } else {

            return "notUser";
        }
    }

    public String reSendEmail(String email, String emailCode){
        // 메일 보내기
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setTo(email);

        simpleMailMessage.setSubject("백야호 회원가입 인증 메일");
        simpleMailMessage.setText(emailCode);

        javaMailSender.send(simpleMailMessage);
        return "success";
    }

    //난수 만들기
    public static String makeRand() {
        String code = Integer.toString(ThreadLocalRandom.current().nextInt(100000, 1000000));
        return code;
    }

    // 이메일 코드 확인하기
    public static boolean verifyEmail(String userCode, String emailCode){

        if(userCode.equals(emailCode)) return true;
        return false;
    }
}
