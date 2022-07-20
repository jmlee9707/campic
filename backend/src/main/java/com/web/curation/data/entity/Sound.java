package com.web.curation.data.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class Sound {

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private int soundId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String link;
}
