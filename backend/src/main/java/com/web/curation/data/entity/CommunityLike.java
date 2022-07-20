package com.web.curation.data.entity;

import javax.persistence.*;

@Entity
public class CommunityLike {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private int likeId;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne
    @JoinColumn(name = "boardId")
    private Community community;

}
