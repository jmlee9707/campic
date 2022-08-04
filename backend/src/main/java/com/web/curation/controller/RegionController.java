package com.web.curation.controller;

import com.web.curation.data.dto.ScheduleDto;
import com.web.curation.data.entity.Guguncode;
import com.web.curation.data.entity.Sidocode;
import com.web.curation.service.RegionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/region")
public class RegionController {
    private final RegionService regionService;

    @Autowired
    public RegionController(RegionService regionService){
        this.regionService = regionService;
    }

    @GetMapping()
    public List<Sidocode> getAllSido(){
        return regionService.getAllSido();
    }

    @GetMapping("/sidocode")
    public List<Guguncode> getGugunCode(@RequestParam String sidocode){
        return regionService.getAllGungu(sidocode);
    }


}
