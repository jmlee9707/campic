package com.web.curation.data.dto;

import com.web.curation.data.entity.TotalCampList;
import lombok.*;

@Getter
@Setter
public class CampDto {
    @Getter
    public static class CampDetail {
        private final int campId;
        private final String facltNm;
        private final String lineIntro;
        private final String intro;
        private final String bizrno;
        private final String doNm;
        private final String sigunguNm;
        private final String addr1;
        private final String addr2;
        private final String mapX;
        private final String mapY;
        private final String tel;
        private final String homepage;
        private final String resveUrl;
        private final String resveCl;
        private final String firstImageUrl;
        private final String sbrsCl;
        private final String posblFcltyCl;

        public CampDetail(TotalCampList totalCampList) {
            this.campId = totalCampList.getCampId();
            this.facltNm = totalCampList.getFacltNm();
            this.lineIntro = totalCampList.getLineIntro();
            this.intro = totalCampList.getIntro();
            this.bizrno = totalCampList.getBizrno();
            this.doNm = totalCampList.getDoNm();
            this.sigunguNm = totalCampList.getSigunguNm();
            this.addr1 = totalCampList.getAddr1();
            this.addr2 = totalCampList.getAddr2();
            this.mapX = totalCampList.getMapX();
            this.mapY = totalCampList.getMapY();
            this.tel = totalCampList.getTel();
            this.homepage = totalCampList.getHomepage();
            this.resveUrl = totalCampList.getResveUrl();
            this.resveCl = totalCampList.getResveCl();
            this.firstImageUrl = totalCampList.getFirstImageUrl();
            this.sbrsCl = totalCampList.getSbrsCl();
            this.posblFcltyCl = totalCampList.getPosblFcltyCl();

        }
    }

    @Getter
    @Setter
    @RequiredArgsConstructor
    public static class CampList {
        private final int campId;
        private final String facltNm;
        private final String addr1;
        private final String firstImageUrl;
        private final String homepage;
        private final String mapX;
        private final String mapY;


        public CampList(TotalCampList totalCampList) {
            this.campId = totalCampList.getCampId();
            this.facltNm = totalCampList.getFacltNm();
            this.addr1 = totalCampList.getAddr1();
            this.firstImageUrl = totalCampList.getFirstImageUrl();
            this.homepage = totalCampList.getHomepage();
            this.mapX = totalCampList.getMapX();
            this.mapY = totalCampList.getMapY();
        }
    }


}