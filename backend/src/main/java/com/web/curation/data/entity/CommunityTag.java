package com.web.curation.data.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class CommunityTag {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private int tagId;

    @ManyToOne
    @JoinColumn(name = "boardId")
    private Community community;

    private String tagWord;
}
