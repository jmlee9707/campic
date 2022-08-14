package com.web.curation.controller;

import com.web.curation.data.dto.SearchListDto;
import com.web.curation.data.entity.ShopSearch;
import com.web.curation.service.ShopSearchService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/shop")
public class ShopSearchController {

    private final ShopSearchService shopSearchService;

    @Autowired
    public ShopSearchController(ShopSearchService shopSearchService){
        this.shopSearchService = shopSearchService;
    }

    @PostMapping()
    public ResponseEntity save(@RequestBody ShopSearch shopSearch){
        return ResponseEntity.ok(shopSearchService.save(shopSearch));
    }

    @GetMapping()
    public ResponseEntity<List<String>> bestSearch() {
        return new ResponseEntity<List<String>>(shopSearchService.bestSearch(), HttpStatus.OK);
    }


}
