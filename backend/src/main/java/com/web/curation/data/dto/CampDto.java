package com.web.curation.data.dto;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;

@Getter
@Setter
public class CampDto {

    private int campId;
    private String facltNm;
    private String lineIntro;
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
}
