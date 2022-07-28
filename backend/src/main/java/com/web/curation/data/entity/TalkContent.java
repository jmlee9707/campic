package com.web.curation.data.entity;

import lombok.*;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@Entity
public class TalkContent {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private int talkcontentId;
    @ManyToOne
    @JoinColumn(name = "talkId")
    private Talk talk;

    private int textOrImg;
    private int seqNum;
    @Column(length=1000)
    private String content;

}
