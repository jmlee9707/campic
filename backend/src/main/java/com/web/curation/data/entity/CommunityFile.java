package com.web.curation.data.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class CommunityFile {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int fileId;

    private int boardId;

    private int userId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String filePath;

    @Column(nullable = false)
    private String fileType;

    @Column(nullable = false)
    private String fileSize;

    @Column(nullable = false)
    private String saveName;
}
