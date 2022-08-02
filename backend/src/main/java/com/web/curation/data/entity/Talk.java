package com.web.curation.data.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@Entity
public class Talk {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private int talkId;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    private LocalDateTime uploadDate;
    private String title;
    private String hashtag;

//    @OneToOne
//    @JoinColumn(name = "thumbnailId")
//    private ThumbnailFile thumbnailFile;

    @Lob
    private String contents;

    @Column(columnDefinition = "integer default 0", nullable = false)
    private int click;

    @OneToMany(mappedBy = "talk", cascade = CascadeType.ALL)
    @OrderBy("commentId asc ")
    private List<Comment> comments;


}
