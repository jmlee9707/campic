package com.web.curation.data.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;


@Getter
@Setter
@Entity
public class LikedCampList {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int saveId;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne
    @JoinColumn(name = "campId")
    private TotalCampList totalCampList;
    private java.util.Date startDate;
    private java.util.Date endDate;


}
