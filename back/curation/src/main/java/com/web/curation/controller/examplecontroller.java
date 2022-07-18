package com.web.curation.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/example")
public class examplecontroller {

    @ResponseBody
    @GetMapping("/")
    public String helloWorld() {
        return "helloworld";
    }
}
