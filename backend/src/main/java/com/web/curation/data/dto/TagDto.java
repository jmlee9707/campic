package com.web.curation.data.dto;

import com.web.curation.data.entity.CampTag;
import com.web.curation.data.entity.TotalCampList;
import lombok.*;

public class TagDto {

    @Data
    @ToString
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Request{
        private int tagId;
        private String hashtag;
        private TotalCampList campId;
        private int tagGroup;

        /* Dto -> Entity */
        public CampTag toEntity() {
            CampTag campTag = CampTag.builder()
                    .tagId(tagId)
                    .hashtag(hashtag)
                    .totalCampList(campId)
                    .tagGroup(tagGroup)
                    .build();

            return campTag;
        }
    }

    @Getter
    public static class Response {
        private int tagId;
        private String hashtag;
        private int campId;
        private int tagGroup;

        public Response(CampTag campTag) {
            this.tagId = campTag.getTagId();
            this.hashtag = campTag.getHashtag();
            this.campId = campTag.getTotalCampList().getCampId();
            this.tagGroup = campTag.getTagGroup();
        }
    }

    @Getter
    public static class SearchedTag {
        private int campId;
        private int tagGroup;

        public SearchedTag(CampTag campTag){
            this.campId = campTag.getTotalCampList().getCampId();
            this.tagGroup = campTag.getTagGroup();
        }
    }
}
