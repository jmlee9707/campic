package com.web.curation.data.repository;

import com.web.curation.data.entity.LikedCampList;
import com.web.curation.data.entity.TodoList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TodoRepository extends JpaRepository<TodoList, Integer> {
    List<TodoList> getTodoListsByLikedCampListOrderByTodoId(LikedCampList likedCampList);

}