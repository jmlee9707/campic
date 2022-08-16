package com.web.curation.data.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class TotalCampList {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private int campId;

    private String facltNm;
    private String lineIntro;
    @Column(length=4000)
    private String intro;
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
    private String sbrsCl;
    private String posblFcltyCl;
    private int lclcount;

}
