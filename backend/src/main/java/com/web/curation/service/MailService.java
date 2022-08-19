package com.web.curation.service;

import com.web.curation.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.mail.Message;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
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
    public String sendEmail(String email, String emailCode) throws Exception{
        // 메일 중복 체크
        if(userRepository.existsByEmail(email)){
//            System.out.println("메일 중복 "+email);
            return "duplicate";
        } else {
            // 메일 보내기
            reSendEmail(email, emailCode);
            return "success";
        }
    }

    public String reSendEmail(String email, String emailCode) throws Exception{
        // 메일 보내기
        MimeMessage message = javaMailSender.createMimeMessage();
        message.addRecipients(Message.RecipientType.TO, email);

        message.setSubject("백야호 회원가입 인증 메일");
        String msgg="";
        msgg+= "<div style='margin:100px;'>";
        msgg+= "<h1> 안녕하세요 백야호입니다. </h1>";
        msgg+= "<br>";
        msgg+= "<p>아래 코드를 회원가입 창으로 돌아가 입력해주세요<p>";
        msgg+= "<br>";
        msgg+= "<p>감사합니다!<p>";
        msgg+= "<br>";
        msgg+= "<div align='center' style='border:1px solid black; font-family:verdana';>";
        msgg+= "<h3 style='color:blue;'>회원가입 인증 코드입니다.</h3>";
        msgg+= "<div style='font-size:130%'>";
        msgg+= "CODE : <strong>";
        msgg+= emailCode+"</strong><div><br/> ";
        msgg+= "</div>";
        message.setText(msgg, "utf-8", "html");

        message.setFrom(new InternetAddress("hundredyaho@gmail.com","백야호"));
        message.setText(msgg, "utf-8", "html");

        javaMailSender.send(message);
        return "success";
    }

    public String sendEmailForPw(String email, String emailCode) throws Exception{
        // 메일 중복 체크
        if(userRepository.existsByEmail(email)){
            // 메일 보내기
            reSendEmail(email, emailCode);
            return "success";
        } else {

            return "fail";
        }
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
