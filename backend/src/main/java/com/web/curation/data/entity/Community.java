package com.web.curation.data.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class Community {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private int boardId;
    private int userId;
    private LocalDateTime uploadDate;
    private String title;
    private String content;
    private int click;
    private int dType;
}
