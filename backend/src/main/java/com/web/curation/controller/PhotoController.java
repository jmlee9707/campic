package com.web.curation.controller;

import com.web.curation.data.dto.PhotoDto;
import com.web.curation.service.PhotoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialException;
import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Blob;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
//@CrossOrigin("*")
@RequestMapping("/photo")
public class PhotoController {
    private final Logger LOGGER = LoggerFactory.getLogger(PhotoController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private final PhotoService photoService;

    @Autowired
    public PhotoController(PhotoService photoService) {
        this.photoService = photoService;
    }

    @GetMapping()
    public ResponseEntity<List<PhotoDto>> listPhoto(@RequestParam int page) {
        LOGGER.info("listPhoto - 호출");
        return new ResponseEntity<List<PhotoDto>>(photoService.listPhoto(page), HttpStatus.OK);
    }

    @GetMapping("/best")
    public ResponseEntity<List<PhotoDto>> bestPhoto() {
        LOGGER.info("bestPhoto - 호출");
        return new ResponseEntity<List<PhotoDto>>(photoService.bestPhoto(), HttpStatus.OK);
    }

    // 포토 상세
    @GetMapping("/detail/{boardId}")
    public ResponseEntity<PhotoDto> detailPhoto(@PathVariable String boardId) {
        LOGGER.info("detailPhoto 호출");
        return new ResponseEntity<>(photoService.detailPhoto(Integer.parseInt(boardId)), HttpStatus.OK);
    }

    @GetMapping("{email}")
    public ResponseEntity<List<PhotoDto>> userPhoto(@PathVariable String email) {
        LOGGER.info("userPhoto - 호출");
        return new ResponseEntity<List<PhotoDto>>(photoService.userPhoto(email), HttpStatus.OK);
    }

    private String uploadPath = "/home/ubuntu/app/photo/";

    @PostMapping
    public ResponseEntity<Map<String, Object>> writePhoto(PhotoDto photoDto, MultipartFile file) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.OK;

        LOGGER.info("writePhoto - 호출");

        String fileName = file.getOriginalFilename();
        photoDto.setFileName(fileName);

        byte[] bytes;

        try{
            bytes = file.getBytes();
            photoDto.setSaveFile(bytes);
//            LOGGER.info("bytes 파일 {}", bytes.toString().substring(0,11));
        }  catch (IOException e2){
            e2.printStackTrace();
        }

        int result = photoService.writePhoto(photoDto);
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
    public ResponseEntity<String> updatePhoto(PhotoDto photoDto) {
        LOGGER.info("updatePhoto - 호출");

//        String fileName = file.getOriginalFilename();
//        photoDto.setFileName(fileName);
//        byte[] bytes;

//        try{
//            bytes = file.getBytes();
//            photoDto.setSaveFile(bytes);
////            LOGGER.info("bytes 파일 {}", bytes.toString().substring(0,11));
//        }  catch (IOException e2){
//            e2.printStackTrace();
//        }

        if (photoService.updatePhoto(photoDto)) {
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("{boardId}")
    public ResponseEntity<String> deletePhoto(@PathVariable int boardId) {
        LOGGER.info("deletePhoto - 호출");
        if (photoService.deletePhoto(boardId)) {
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
    }

    @PostMapping("/like")
    public ResponseEntity<Map<String,Object>> pushLike(@RequestParam int boardId, @RequestParam String email) {
        Map<String, Object> resultMap = new HashMap<>();
        LOGGER.info("pushLike - 호출");
//        int intOfBoardId = Integer.parseInt(boardId);
        int likeCount = photoService.pushLike(boardId, email);

        if (likeCount != -1) {

            resultMap.put("like", likeCount);
            resultMap.put("message", SUCCESS);

            return new ResponseEntity<>(resultMap, HttpStatus.OK);
        }

        resultMap.put("message", FAIL);
        return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/like")
    public ResponseEntity<Map<String,Object>> cancelLike(@RequestParam int boardId, @RequestParam String email) {
        Map<String, Object> resultMap = new HashMap<>();
        LOGGER.info("cancelLike - 호출");

        int likeCount = photoService.cancelLike(boardId, email);
        if (likeCount != -1) {

            resultMap.put("like", likeCount);
            resultMap.put("message", SUCCESS);

            return new ResponseEntity<>(resultMap, HttpStatus.OK);
        }
        resultMap.put("message", FAIL);
        return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/detail/isLiked")
    public ResponseEntity<Map<String, Object>> isUserLikedPhoto(@RequestParam int boardId, @RequestParam String email) {

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.OK;

        LOGGER.info("isUserLikedPhoto 호출");

        int isLiked = photoService.isUserLikedPhoto(boardId, email);

        resultMap.put("isLike", isLiked);
        resultMap.put("message", SUCCESS);

        return new ResponseEntity<>(resultMap, status);
    }

}
