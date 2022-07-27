package com.web.curation.data.dto;

import com.web.curation.data.entity.LikedCampList;
import com.web.curation.data.entity.TodoList;
import lombok.*;

public class TodoDto {

    /** Todo Service 요청을 위한 DTO 클래스 */

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Request {
        private int todoId;
        private LikedCampList saveId;
        private String task;
        private boolean done;
        /* Dto -> Entity */
        public TodoList toEntity() {
            TodoList todoList = TodoList.builder()
                    .todoId(todoId)
                    .likedCampList(saveId)
                    .task(task)
                    .done(done)
                    .build();

            return todoList;
        }
    }

    /**
     * Todolist 정보를 리턴할 응답(Response) 클래스
     * Entity 클래스를 생성자 파라미터로 받아 데이터를 Dto로 변환하여 응답
     * 별도의 전달 객체를 활용해 연관관계를 맺은 엔티티간의 무한참조를 방지
     */
    @RequiredArgsConstructor
    @Getter
    public static class Response {
        private int todoId;
        private int saveId;
        private String task;
        private boolean done;
        /* Entity -> Dto*/
        public Response(TodoList todoList) {
            this.todoId = todoList.getTodoId();
            this.saveId = todoList.getLikedCampList().getSaveId();
            this.task = todoList.getTask();
            this.done = todoList.isDone();
        }
    }

}
