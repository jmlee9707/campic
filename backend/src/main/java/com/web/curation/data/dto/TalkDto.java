package com.web.curation.data.dto;

import com.web.curation.data.entity.Comment;
import com.web.curation.data.entity.TalkContent;
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
    private LocalDateTime uploadDate;
    private String title;
    private String hashtag;
    private String thumbnailFileName;
    private String thumbnailFilePath;
    private List<TalkContent> talkContents;
    private int click;
    private long like;

}
