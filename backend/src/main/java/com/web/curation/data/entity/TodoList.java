package com.web.curation.data.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class TodoList {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private int todoId;
    private int saveId;
    private int userId;
    @Column(nullable = false)
    private String task;

    @Column(nullable = false)
    private boolean done;
}
