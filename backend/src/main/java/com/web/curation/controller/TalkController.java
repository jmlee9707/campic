package com.web.curation.controller;

import com.web.curation.data.dto.TalkDto;
import com.web.curation.service.TalkService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
//@CrossOrigin("*")
@RequestMapping("/talk")

public class TalkController {
    private final Logger LOGGER = LoggerFactory.getLogger(TalkController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private final TalkService talkService;

    @Autowired
    private TalkController(TalkService talkService){
        this.talkService = talkService;
    }


    @GetMapping
    public ResponseEntity<List<TalkDto>> listTalk(@RequestParam int page) {
        LOGGER.info("listTalk - 호출");
        return new ResponseEntity<List<TalkDto>>(talkService.listTalk(page), HttpStatus.OK);
    }

    @GetMapping("/best")
    public ResponseEntity<List<TalkDto>> bestTalk() {
        LOGGER.info("bestTalk - 호출");
        return new ResponseEntity<List<TalkDto>>(talkService.bestTalk(), HttpStatus.OK);
    }

    @GetMapping("/{email}")
    public ResponseEntity<List<TalkDto>> userTalk(@PathVariable String email) {
        LOGGER.info("특정 user 게시물 - 호출");
        return new ResponseEntity<List<TalkDto>>(talkService.userTalk(email), HttpStatus.OK);
    }

    @GetMapping("/detail/{talkId}")
    public ResponseEntity<TalkDto> detailTalk(@PathVariable int talkId) {
        LOGGER.info("detailTalk 호출 {}", talkId);
        return new ResponseEntity<>(talkService.detailTalk(talkId), HttpStatus.OK);
    }


    private String uploadPath = "/home/ubuntu/app/photo/";

    @PostMapping
    public ResponseEntity<Map<String, Object>> writeTalk(TalkDto talkDto, MultipartFile file) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.OK;

        LOGGER.info("writeTalk - 호출");

        String fileName = file.getOriginalFilename();
        talkDto.setFileName(fileName);

        byte[] bytes;

        try{
            bytes = file.getBytes();
            talkDto.setSaveFile(bytes);
            LOGGER.info("bytes 파일 {}", bytes.toString().substring(0,11));
        }  catch (IOException e2){
            e2.printStackTrace();
        }

        int result = talkService.writeTalk(talkDto);

        if (result != 0) {
            resultMap.put("message", SUCCESS);
            resultMap.put("talkId", result);
            return new ResponseEntity<>(resultMap, status);
        }

        resultMap.put("message", FAIL);
        status = HttpStatus.BAD_REQUEST;

        return new ResponseEntity<>(resultMap, status);
    }


    @PutMapping
    public ResponseEntity<String> updateTalk(TalkDto talkDto) {
        LOGGER.info("updateTalk - 호출");

//        String fileName = file.getOriginalFilename();
//        talkDto.setFileName(fileName);
//        byte[] bytes;
//
//        try{
//            bytes = file.getBytes();
//            talkDto.setSaveFile(bytes);
//            LOGGER.info("bytes 파일 {}", bytes.toString().substring(0,11));
//        }  catch (IOException e2){
//            e2.printStackTrace();
//        }

        if (talkService.updateTalk(talkDto)) {
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("{talkId}")
    public ResponseEntity<String> deleteTalk(@PathVariable int talkId) {
        LOGGER.info("deleteTalk - 호출");
        if (talkService.deleteTalk(talkId)) {
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
    }


    @PostMapping("/like")
    public ResponseEntity<Map<String,Object>> pushLike(@RequestParam int talkId, @RequestParam String email) {
        Map<String, Object> resultMap = new HashMap<>();
        LOGGER.info("pushLike - 호출");
        int likeCount = talkService.pushLike(talkId, email);
        if (likeCount != -1) {

            resultMap.put("like", likeCount);
            resultMap.put("message", SUCCESS);

            return new ResponseEntity<>(resultMap, HttpStatus.OK);
        }

        resultMap.put("message", FAIL);
        return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/like")
    public ResponseEntity<Map<String,Object>> cancelLike(@RequestParam int talkId, @RequestParam String email) {
        Map<String, Object> resultMap = new HashMap<>();
        LOGGER.info("cancelLike - 호출");
        int likeCount = talkService.cancelLike(talkId, email);

        if (likeCount != -1) {

            resultMap.put("like", likeCount);
            resultMap.put("message", SUCCESS);

            return new ResponseEntity<>(resultMap, HttpStatus.OK);
        }

        resultMap.put("message", FAIL);
        return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/detail/isLiked")
    public ResponseEntity<Map<String, Object>> isUserLikedTalk(@RequestParam int talkId, @RequestParam String email) {

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.OK;

        LOGGER.info("isUserLikedTalk 호출");

        int isLiked = talkService.isUserLikedTalk(talkId, email);

        resultMap.put("isLike", isLiked);
        resultMap.put("message", SUCCESS);

        return new ResponseEntity<>(resultMap, status);
    }


}
