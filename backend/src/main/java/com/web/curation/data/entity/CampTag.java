package com.web.curation.data.entity;

import lombok.*;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@Entity
public class CampTag {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private int tagId;

//    private int campId;
    @ManyToOne
    @JoinColumn(name = "campId")
    private TotalCampList totalCampList;

    @Column(nullable = false)
    private String hashtag;

    @Column
    private int tagGroup;

}
