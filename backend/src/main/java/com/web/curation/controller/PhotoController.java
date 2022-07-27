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

import java.util.List;

@RestController
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

    @GetMapping
    public ResponseEntity<List<PhotoDto>> listPhoto() {
        LOGGER.info("listPhoto - 호출");
        return new ResponseEntity<List<PhotoDto>>(photoService.listPhoto(), HttpStatus.OK);
    }

    @GetMapping("/best")
    public ResponseEntity<List<PhotoDto>> bestPhoto() {
        LOGGER.info("bestPhoto - 호출");
        return new ResponseEntity<List<PhotoDto>>(photoService.bestPhoto(), HttpStatus.OK);
    }

    @GetMapping("{email}")
    public ResponseEntity<List<PhotoDto>> bestPhoto(@PathVariable String email) {
        LOGGER.info("bestPhoto - 호출");
        return new ResponseEntity<List<PhotoDto>>(photoService.userPhoto(email), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<String> writePhoto(PhotoDto photoDto, MultipartFile file) {
        LOGGER.info("writePhoto - 호출");
        photoDto.setFilePath(file.getOriginalFilename());
        if (photoService.writePhoto(photoDto)) {
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
    }

    @PutMapping
    public ResponseEntity<String> updatePhoto(PhotoDto photoDto, MultipartFile file) {
        LOGGER.info("updatePhoto - 호출");
//        LOGGER.info(photoDto.getTitle());

        photoDto.setFilePath(file.getOriginalFilename());
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
    public ResponseEntity<String> pushLike(@RequestParam int boardId, @RequestParam String email) {
        LOGGER.info("pushLike - 호출");
//        int intOfBoardId = Integer.parseInt(boardId);
        if (photoService.pushLike(boardId, email)) {
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/like")
    public ResponseEntity<String> cancelLike(@RequestParam int boardId, @RequestParam String email) {
        LOGGER.info("cancelLike - 호출");
        if (photoService.cancelLike(boardId, email)) {
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
    }
}
