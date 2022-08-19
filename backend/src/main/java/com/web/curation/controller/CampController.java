package com.web.curation.controller;

import com.web.curation.config.security.JwtTokenProvider;
import com.web.curation.data.dto.CampDto;
import com.web.curation.data.dto.ScheduleDto;
import com.web.curation.data.dto.SearchListDto;
import com.web.curation.data.dto.UserDto;
import com.web.curation.data.entity.LikedCampList;
import com.web.curation.data.entity.TotalCampList;
import com.web.curation.exception.CampNotFoundException;
import com.web.curation.service.CampService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import java.util.*;

@RestController
//@CrossOrigin("*")
@RequestMapping("/camp")
public class CampController {
    private final Logger LOGGER = LoggerFactory.getLogger(CampController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";
    private final CampService campService;
    private final JwtTokenProvider jwtTokenProvider;
    EntityManager entityManager;

    @Autowired
    public CampController(CampService campService, JwtTokenProvider jwtTokenProvider) {
        this.campService = campService;
        this.jwtTokenProvider = jwtTokenProvider;
    }
    @PostMapping()
    public List<CampDto.CampList> filterCampList(@RequestBody SearchListDto.SearchList searchList) {
        LOGGER.info("filterCampList - 호출");
        return campService.filterCampList(searchList);
    }

    /* campDetail READ */
    @GetMapping("/{campId}")
    public ResponseEntity<CampDto.CampDetail> campDetailRead(@PathVariable("campId") int campId){
        LOGGER.info("campDetailRead - 호출");
        return new ResponseEntity<CampDto.CampDetail>(campService.campDetailRead(campId),HttpStatus.OK);

    }

    /*
    likedCampList(schedule) CREATE
    */
    @PostMapping("/{campId}")
    public ResponseEntity save(@RequestBody ScheduleDto.Request dto,@RequestParam String email,@PathVariable("campId") int campId) {
        return ResponseEntity.ok(campService.save(dto,email,campId));
    }

    /* bestcamp */
    @GetMapping()
    public ResponseEntity<List<String>> bestCamp(){
        return new ResponseEntity<List<String>>(campService.getBestCamps(),HttpStatus.OK);
    }

}
