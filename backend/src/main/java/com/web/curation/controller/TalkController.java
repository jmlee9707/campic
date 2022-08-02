package com.web.curation.controller;

import com.web.curation.data.dto.PhotoDto;
import com.web.curation.data.dto.TalkDto;
import com.web.curation.service.PhotoService;
import com.web.curation.service.TalkService;
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
    private final Logger LOGGER = LoggerFactory.getLogger(PhotoController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private final TalkService talkService;

    @Autowired
    public TalkController(TalkService talkService) {
        this.talkService = talkService;
    }

    @GetMapping
    public ResponseEntity<List<TalkDto>> listTalk() {
        LOGGER.info("listTalk - 호출");
        return new ResponseEntity<List<TalkDto>>(talkService.listTalk(), HttpStatus.OK);
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

    @GetMapping("/{talkId}")
    public ResponseEntity<TalkDto> detailTalk(@PathVariable int talkId) {
        LOGGER.info("detailPhoto 호출");
        return new ResponseEntity<>(talkService.detailTalk(talkId), HttpStatus.OK);
    }


    private String uploadPath = "/home/ubuntu/app/photo/";

    @PostMapping
    public ResponseEntity<Map<String, Object>> writeTalk(TalkDto talkDto, MultipartFile file) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.OK;

        LOGGER.info("writePhoto - 호출");

        // 이미지 파일이 아닐 때
        if(file.getContentType().startsWith("image") == false){
            LOGGER.warn("this file is not image type");
            resultMap.put("message", FAIL);
            status = HttpStatus.BAD_REQUEST;

            return new ResponseEntity<>(resultMap, status);
        }

        //브라우저에 따라 업로드하는 파일의 이름은 전체경로일 수도 있고(Internet Explorer),
        //단순히 파일의 이름만을 의미할 수도 있습니다.(chrome browser)
        String originalName = file.getOriginalFilename();//파일명:모든 경로를 포함한 파일이름
        String fileName = originalName.substring(originalName.lastIndexOf("//") + 1);

        LOGGER.info("fileName" + fileName);

        //UUID
        String uuid = UUID.randomUUID().toString();
        //저장할 파일 이름 중간에 "_"를 이용하여 구분
        String saveName = uploadPath + File.separator + File.separator + uuid + "_" + fileName;

        Path savePath = Paths.get(saveName);
        //Paths.get() 메서드는 특정 경로의 파일 정보를 가져옵니다.(경로 정의하기)

        try {
            file.transferTo(savePath);
            //uploadFile에 파일을 업로드 하는 메서드 transferTo(file)
        } catch (IOException e) {
            e.printStackTrace();
            //printStackTrace()를 호출하면 로그에 Stack trace가 출력됩니다.
        }

        talkDto.setThumbnailFilePath(savePath.toString());

        int result = talkService.writeTalk(talkDto);

        if (result != 0) {
            resultMap.put("message", SUCCESS);
            resultMap.put("boardId", result);
            return new ResponseEntity<>(resultMap, status);
        }

        resultMap.put("message", FAIL);
        status = HttpStatus.BAD_REQUEST;

        return new ResponseEntity<>(resultMap, status);
    }


    @PutMapping
    public ResponseEntity<String> updateTalk(TalkDto talkDto, MultipartFile file) {
        LOGGER.info("updateTalk - 호출");

        talkDto.setThumbnailFileName(file.getOriginalFilename());
        if (talkService.updateTalk(talkDto)) {
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("{talkId}")
    public ResponseEntity<String> deletePhoto(@PathVariable int talkId) {
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




}
