package com.web.curation.service;

import com.web.curation.data.dto.CommentDto;
import com.web.curation.data.entity.Comment;
import com.web.curation.data.entity.Talk;
import com.web.curation.data.entity.User;
import com.web.curation.data.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final TalkRepository talkRepository;

    @Autowired
    public CommentService(CommentRepository commentRepository, UserRepository userRepository, TalkRepository talkRepository) {
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.talkRepository = talkRepository;
    }

    /* CREATE */
    @Transactional
    // depth -> 댓글인지 대댓글인지 프론트에서 알려주세요 댓글 -> 0, 대댓글 -> 1
    // bundle -> 몇번째 댓글에 대한 대댓글인지 댓글 아이디 넘기기
    public int save(int talkId,CommentDto.ComDto dto) {
        User user = userRepository.getByEmail(dto.getEmail());
        Talk talk = talkRepository.findById(talkId).orElseThrow(() ->
                new IllegalArgumentException("댓글 쓰기 실패: 해당 게시글이 존재하지 않습니다. " + talkId));

        Comment comment = new Comment();

        comment.setUser(user);
        comment.setTalk(talk);
        comment.setUploadDate(dto.getUploadDate());
        comment.setDepth(dto.getDepth());
        comment.setBundle(dto.getBundle());
        comment.setContent(dto.getContent());

        commentRepository.save(comment);

        return comment.getCommentId();
    }
    /* READ */
    @Transactional(readOnly = true)
    public List<CommentDto.Response> findAll(int talkId) {
        Talk talk = talkRepository.findById(talkId).orElseThrow(() ->
                new IllegalArgumentException("해당 게시글이 존재하지 않습니다. id: " + talkId));
        List<Comment> comments = talk.getComments();
        return comments.stream().map(CommentDto.Response::new).collect(Collectors.toList());
    }


    /* UPDATE */
    @Transactional
    public void update(int commentId, CommentDto.Request dto) {
        Comment comment = commentRepository.findById(commentId).orElseThrow(() ->
                new IllegalArgumentException("해당 댓글이 존재하지 않습니다. " + commentId));

        comment.update(dto.getContent());
    }

    /* DELETE */
    @Transactional
    public void delete(int commentId) {
        Comment comment = commentRepository.findById(commentId).orElseThrow(() ->
                new IllegalArgumentException("해당 댓글이 존재하지 않습니다. id=" + commentId));

        commentRepository.delete(comment);
    }

}
