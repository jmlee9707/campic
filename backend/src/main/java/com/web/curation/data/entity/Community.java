package com.web.curation.data.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class Community {

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private int boardId;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    private LocalDateTime uploadDate;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    private String hashtag;

    private int click;

    @Column(nullable = false)
    private int dType;



}
