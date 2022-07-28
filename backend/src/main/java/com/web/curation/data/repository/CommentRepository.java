package com.web.curation.data.repository;

import com.web.curation.data.entity.Comment;
import com.web.curation.data.entity.Talk;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
//    List<Comment> getCommentByBundleEqualsAndDepth(Talk talk);
}
