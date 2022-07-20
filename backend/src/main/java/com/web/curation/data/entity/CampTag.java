package com.web.curation.data.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class CampTag {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private int tagId;

    private int campId;

    @Column(nullable = false)
    private String hashtag;
}
