package com.web.curation.data.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class PhotoDto {

    private String profileImgPath;

    private int boardId;
    private String nickname;
    private String title;
    private String content;
    private String hashtag;
    private LocalDateTime uploadDate;
    private int click;
    private long like;
    private int dType;

    private String fileName;
    private String filePath;

}
