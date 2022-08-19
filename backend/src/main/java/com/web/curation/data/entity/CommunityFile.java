package com.web.curation.data.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Blob;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class CommunityFile {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int fileId;

    @ManyToOne
    @JoinColumn(name = "boardId")
    private Community community;


    private String name;

    @Column(nullable = false)
    private byte[] file;

    private String fileType;

    private String fileSize;

    private String saveName;


}
