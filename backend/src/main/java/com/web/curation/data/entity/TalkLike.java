package com.web.curation.data.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;


@Getter
@Setter
@Entity
public class TalkLike {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int likeId;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne
    @JoinColumn(name = "talkId")
    private Talk talk;

}
