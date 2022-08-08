package com.web.curation.data.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class ThumbnailFile {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int thumbnailId;

    @ManyToOne
    @JoinColumn(name = "talkId")
    private Talk talk;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private byte[] file;

    private String fileType;

    private String fileSize;

    private String saveName;
}
