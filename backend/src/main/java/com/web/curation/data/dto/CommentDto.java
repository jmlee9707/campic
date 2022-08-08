package com.web.curation.data.dto;

import com.web.curation.data.entity.Comment;
import com.web.curation.data.entity.Talk;
import com.web.curation.data.entity.User;
import lombok.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class CommentDto {
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Request {
        private int commentId;
        private String content;
        private String uploadDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm"));
        private User userId;
        private Talk talkId;
        private int depth;
        private int bundle;
        /* Dto -> Entity */
        public Comment toEntity() {
            Comment comments = Comment.builder()
                    .commentId(commentId)
                    .content(content)
                    .uploadDate(uploadDate)
                    .user(userId)
                    .talk(talkId)
                    .depth(depth)
                    .bundle(bundle)
                    .build();

            return comments;
        }
    }

    /**
     * 댓글 정보를 리턴할 응답(Response) 클래스
     * Entity 클래스를 생성자 파라미터로 받아 데이터를 Dto로 변환하여 응답
     * 별도의 전달 객체를 활용해 연관관계를 맺은 엔티티간의 무한참조를 방지
     */
    @RequiredArgsConstructor
    @Getter
    public static class Response {
        private int commentId;
        private String content;
        private String uploadDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm"));
        private int userId;
        private String nickname;
        private byte[] profileImg;
        private int talkId;
        private int depth;
        private int bundle;
        /* Entity -> Dto*/
        public Response(Comment comment) {
            this.commentId = comment.getCommentId();
            this.content = comment.getContent();
            this.uploadDate = comment.getUploadDate();
            this.userId = comment.getUser().getUserId();
            this.nickname = comment.getUser().getNickname();
            this.profileImg = comment.getUser().getProfileImg();
            this.talkId = comment.getTalk().getTalkId();
            this.depth = comment.getDepth();
            this.bundle = comment.getBundle();
        }
    }
}
