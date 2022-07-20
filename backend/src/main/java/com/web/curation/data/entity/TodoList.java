package com.web.curation.data.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter
@Setter
@Entity
public class TodoList {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private int todoId;
    private int saveId;
    private int userId;
    private String task;
    private boolean done;
}
