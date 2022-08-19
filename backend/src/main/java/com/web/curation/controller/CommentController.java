package com.web.curation.controller;

import com.web.curation.config.security.JwtTokenProvider;
import com.web.curation.data.dto.CommentDto;
import com.web.curation.service.CommentService;
import com.web.curation.service.ScheduleService;
import com.web.curation.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RequestMapping("/talk/comments")
@RestController
public class CommentController {
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService){
        this.commentService = commentService;
    }

    /* READ */
    @GetMapping("/{talkId}")
    public List<CommentDto.Response> read(@PathVariable int talkId) {
        return commentService.findAll(talkId);
    }

    /* CREATE */
    @PostMapping("/{talkId}")
    public ResponseEntity<String> save(@PathVariable int talkId, @RequestBody CommentDto.ComDto dto) {
        int result = commentService.save(talkId, dto);
        if (result != 0) {
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
    }

    /* UPDATE */
    @PutMapping({"/{commentId}"})
    public ResponseEntity update(@PathVariable int commentId, @RequestBody CommentDto.Request dto) {
        commentService.update(commentId, dto);
        return ResponseEntity.ok(commentId);
    }

    /* DELETE */
    @DeleteMapping("/{commentId}")
    public ResponseEntity delete(@PathVariable int commentId) {
        commentService.delete(commentId);
        return ResponseEntity.ok(commentId);
    }
}
