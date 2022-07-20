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

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne
    @JoinColumn(name = "boardId")
    private Community community;

    @Column(nullable = false)
    private LocalDateTime uploadDate;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private int depth;

    @Column(nullable = false)
    private int bundle;


}
