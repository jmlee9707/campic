package com.web.curation.controller;

import com.web.curation.config.security.JwtTokenProvider;
import com.web.curation.data.dto.CommentDto;
import com.web.curation.service.CommentService;
import com.web.curation.service.ScheduleService;
import com.web.curation.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RequestMapping("/talk/comments")
@RestController
public class CommentController {

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
    public ResponseEntity save(@PathVariable int talkId, @RequestBody CommentDto.Request dto,
            String nickname) {
        return ResponseEntity.ok(commentService.save(talkId, "su", dto));
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
