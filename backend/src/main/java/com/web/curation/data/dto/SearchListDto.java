package com.web.curation.data.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SearchListDto {

    @Getter
    @Setter
    @RequiredArgsConstructor
    public static class SearchList {
        private int arrange;
        private String keyword;
        private String sido;
        private String gugun;
        private List<String> tags;
        private int page;

        public SearchList(SearchList searchList){
            this.arrange = searchList.getArrange();
            this.keyword = searchList.getKeyword();
            this.sido = searchList.getSido();
            this.gugun = searchList.getGugun();
            this.tags = searchList.getTags();
            this.page = searchList.getPage();
        }
    }


}
