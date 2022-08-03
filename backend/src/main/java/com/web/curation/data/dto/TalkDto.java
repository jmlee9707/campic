package com.web.curation.data.dto;

import com.web.curation.data.entity.Comment;
import com.web.curation.data.entity.ThumbnailFile;
import com.web.curation.data.entity.User;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class TalkDto {
    private String profileImgPath;
    private int talkId;
    private String nickname;

    private String title;
    private String hashtag;
    private String contents;
    private LocalDateTime uploadDate;

    private int click;
    private long like;

//    private String thumbnailFileName;
//    private String thumbnailFilePath;
    private String fileName;
    private String filePath;


}

