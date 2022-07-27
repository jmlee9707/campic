package com.web.curation.controller;

import com.web.curation.config.security.JwtTokenProvider;
import com.web.curation.data.dto.CampDto;
import com.web.curation.data.dto.ScheduleDto;
import com.web.curation.data.dto.UserDto;
import com.web.curation.data.entity.LikedCampList;
import com.web.curation.data.entity.TotalCampList;
import com.web.curation.exception.CampNotFoundException;
import com.web.curation.service.CampService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/camp")
public class CampController {
    private final Logger LOGGER = LoggerFactory.getLogger(ScheduleController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";
    private final CampService campService;
    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    public CampController(CampService campService, JwtTokenProvider jwtTokenProvider) {
        this.campService = campService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    /* campList READ */
    @GetMapping()
    public List<TotalCampList> getAllCamps(){
        return campService.getAllCamps();
    }

    /* campDetail READ */
    @GetMapping("/{campId}")
    public ResponseEntity<CampDto.CampDetail> campDetailRead(@PathVariable("campId") int campId){
        LOGGER.info("campDetailRead - 호출");
        return new ResponseEntity<CampDto.CampDetail>(campService.campDetailRead(campId),HttpStatus.OK);

    }
    /*
    likedCampList(schedule) CREATE
    로그인한 user id 필요함.
    */
    @PostMapping("/{campId}")
//    public ResponseEntity save(@RequestBody ScheduleDto.Request dto, @LoginUser UserDto.Response user ) {
//        return ResponseEntity.ok(postsService.save(dto, user.getNickname()));
//    }
    public ResponseEntity save(@RequestBody ScheduleDto.Request dto, @PathVariable("campId") int campId) {
        return ResponseEntity.ok(campService.save(dto,1,campId));
    }


}
