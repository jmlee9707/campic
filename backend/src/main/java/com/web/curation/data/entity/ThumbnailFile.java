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

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String filePath;

    private String fileType;

    private String fileSize;

    private String saveName;
}
