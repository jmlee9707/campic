package com.web.curation.data.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class LikedCampList {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private int saveId;
    private int userId;
    private int campId;
    private java.util.Date startDate;
    private java.util.Date endDate;

}
