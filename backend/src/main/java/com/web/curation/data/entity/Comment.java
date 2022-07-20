package com.web.curation.data.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class Comment {

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private int commentId;

    private int userId;

    private int boardId;

    @Column(nullable = false)
    private LocalDateTime uploadDate;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private int depth;

    @Column(nullable = false)
    private int bundle;
}
