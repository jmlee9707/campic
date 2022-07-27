package com.web.curation.data.entity;

import lombok.*;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@Entity
public class TodoList {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private int todoId;

    @ManyToOne
    @JoinColumn(name = "saveId")
    private LikedCampList likedCampList;

    @Column(nullable = false)
    private String task;

    @Column(nullable = false)
    private boolean done;

    /* 댓글 수정 */
    public void update(String task, boolean done) {
        this.task = task;
        this.done = done;
    }

}
