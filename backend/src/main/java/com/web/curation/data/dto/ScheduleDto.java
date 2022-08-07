package com.web.curation.data.dto;

import com.web.curation.data.entity.LikedCampList;
import com.web.curation.data.entity.TotalCampList;
import com.web.curation.data.entity.User;
import lombok.*;

import java.util.Date;

public class ScheduleDto {

    @Data
    @ToString
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Request {
        private int saveId;
        private User userId;
        private TotalCampList campId;
        private String startDate;
        private String endDate;

        private String savedTitle;

        /* Dto -> Entity */
        public LikedCampList toEntity() {
            LikedCampList likedCampList = LikedCampList.builder()
                    .saveId(saveId)
                    .user(userId)
                    .totalCampList(campId)
                    .startDate(startDate)
                    .endDate(endDate)
                    .savedTitle(savedTitle)
                    .build();
            return likedCampList;
        }
    }
    /**
     * 게시글 정보를 리턴할 응답(Response) 클래스
     * Entity 클래스를 생성자 파라미터로 받아 데이터를 Dto로 변환하여 응답
     * 별도의 전달 객체를 활용해 연관관계를 맺은 엔티티간의 무한참조를 방지
     */
    @RequiredArgsConstructor
    @Getter

    public static class Response {
        private final int saveId;
        private final int userId;
        private final int campId;
        private final String startDate;
        private final String endDate;

        private final String savedTitle;

        /* Entity -> Dto*/
        public Response(LikedCampList likedCampList) {
            this.saveId = likedCampList.getSaveId();
            this.userId = likedCampList.getUser().getUserId();
            this.campId = likedCampList.getTotalCampList().getCampId();
            this.startDate = likedCampList.getStartDate();
            this.endDate = likedCampList.getEndDate();
            this.savedTitle = likedCampList.getSavedTitle();
        }
    }

    @Getter
    public static class ScheduleDetail {
        private final int saveId;
        private final int userId;
        private final int campId;
        private final String startDate;
        private final String endDate;
        private final String savedTitle;
        private final String campName;
        private final String campAdd1;
        private final String campAdd2;
        private final String campTel;
        private final String campMapX;
        private final String campMapY;

        /* Entity -> Dto*/
        public ScheduleDetail(LikedCampList likedCampList) {
            this.saveId = likedCampList.getSaveId();
            this.userId = likedCampList.getUser().getUserId();
            this.campId = likedCampList.getTotalCampList().getCampId();
            this.startDate = likedCampList.getStartDate();
            this.endDate = likedCampList.getEndDate();
            this.savedTitle = likedCampList.getSavedTitle();
            this.campName = likedCampList.getTotalCampList().getFacltNm();
            this.campAdd1 = likedCampList.getTotalCampList().getAddr1();
            this.campAdd2 = likedCampList.getTotalCampList().getAddr2();
            this.campTel = likedCampList.getTotalCampList().getTel();
            this.campMapX = likedCampList.getTotalCampList().getMapX();
            this.campMapY = likedCampList.getTotalCampList().getMapY();
        }
    }




}
