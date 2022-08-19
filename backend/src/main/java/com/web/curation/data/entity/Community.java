package com.web.curation.data.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
public class Community {

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private int boardId;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @OneToMany(mappedBy = "community", cascade = {CascadeType.REMOVE})
    private List<CommunityLike> communityLikes = new ArrayList<>();

    private LocalDateTime uploadDate;

//    @Column(nullable = false)
//    private String title;

    @Column(nullable = false)
    private String content;
    private String hashtag;

    private int click;

//    @Column(nullable = false)
//    private int dType;

}
