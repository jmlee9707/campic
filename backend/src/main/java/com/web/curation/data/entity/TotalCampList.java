package com.web.curation.data.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter
@Setter
@Entity
public class TotalCampList {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private int campId;

    private String facltNm;
    private String lineIntro;
    private String bizrno;
    private String doNm;
    private String sigunguNm;
    private String addr1;
    private String addr2;
    private String mapX;
    private String mapY;
    private String tel;
    private String homepage;
    private String resveUrl;
    private String resveCl;
    private String firstImageUrl;

}
