package com.web.curation.data.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SearchRequestDto {
    String query;
    int display;
    int start;

}
