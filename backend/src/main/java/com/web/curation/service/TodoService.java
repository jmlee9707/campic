package com.web.curation.service;

import com.web.curation.data.dto.ScheduleDto;
import com.web.curation.data.dto.TodoDto;
import com.web.curation.data.entity.LikedCampList;
import com.web.curation.data.entity.TodoList;
import com.web.curation.data.repository.LikedCampRepository;
import com.web.curation.data.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class TodoService {
    private final TodoRepository todoRepository;
    private final LikedCampRepository likedCampRepository;

    /* CREATE */
    @Transactional
    public int save(int saveId, TodoDto.Request dto) {
        LikedCampList likedCampList = likedCampRepository.findById(saveId).orElseThrow(() ->
                new IllegalArgumentException("todo 추가 실패: 해당 찜이 존재하지 않습니다. " + saveId));

        dto.setSaveId(likedCampList);
        dto.setDone(false);

        TodoList todoList = dto.toEntity();
        todoRepository.save(todoList);

        return todoList.getTodoId();
    }

    /* UPDATE */
    @Transactional
    public void update(int todoId, TodoDto.Request dto) {
        TodoList todoList = todoRepository.findById(todoId).orElseThrow(() ->
                new IllegalArgumentException("해당 todo가 존재하지 않습니다. " + todoId));

        todoList.update(dto.getTask(), dto.isDone());
    }

    /* DELETE */
    @Transactional
    public void todoDelete(int todoId) {
        TodoList todoList = todoRepository.findById(todoId).orElseThrow(() ->
                new IllegalArgumentException("해당 todo가 존재하지 않습니다. id=" + todoId));

        todoRepository.delete(todoList);
    }

    /* READ */
    @Transactional(readOnly = true)
    public List<TodoDto.Response> findAll(int saveId) {
        LikedCampList likedCampList = likedCampRepository.findById(saveId).orElseThrow(() ->
                new IllegalArgumentException("해당 찜이 존재하지 않습니다. id: " + saveId));
        List<TodoList> todoLists = likedCampList.getTodoLists();
        return todoLists.stream().map(TodoDto.Response::new).collect(Collectors.toList());
    }


}
