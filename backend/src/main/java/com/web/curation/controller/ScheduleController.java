package com.web.curation.controller;

import com.web.curation.config.security.JwtTokenProvider;
import com.web.curation.data.dto.ScheduleDto;
import com.web.curation.data.dto.TodoDto;
import com.web.curation.service.MemberService;
import com.web.curation.service.ScheduleService;
import com.web.curation.service.TodoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/schedule")
public class ScheduleController {
    private final Logger LOGGER = LoggerFactory.getLogger(ScheduleController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";
    private final ScheduleService scheduleService;
    private final TodoService todoService;
    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    public ScheduleController(ScheduleService scheduleService, TodoService todoService, JwtTokenProvider jwtTokenProvider){
        this.scheduleService = scheduleService;
        this.todoService = todoService;
        this.jwtTokenProvider = jwtTokenProvider;
    }
//    /* 일정리스트 READ - 곧 다가올 캠핑 -> 현재일 - 시작일 */
//    @GetMapping("")
//    public List<ScheduleDto.Response> scheduleListAfterRead(){
//        return
//    }
//    /* 일정리스트 READ - 진행중 캠핑 -> 시작일 - 현재일 - 끝일 */
//    @GetMapping("")
//    public List<ScheduleDto.Response> scheduleListNowRead(){
//        return
//    }
//    /* 일정리스트 READ - 지난 캠핑 -> 끝일 - 현재일 */
//    @GetMapping("")
//    public List<ScheduleDto.Response> scheduleListEndRead(){
//        return
//    }

    /* 일정 READ */
    @GetMapping("/{saveId}")
    public ResponseEntity<ScheduleDto.ScheduleDetail> scheduleDetailRead(@PathVariable int saveId){
        LOGGER.info("scheduleDetailRead - 호출");
        return new ResponseEntity<ScheduleDto.ScheduleDetail>(scheduleService.scheduleDetailRead(saveId),HttpStatus.OK);
    }


    /* 일정 UPDATE */
    @PutMapping("/{saveId}")
    public ResponseEntity update(@PathVariable int saveId, @RequestBody ScheduleDto.Request dto) {
        scheduleService.update(saveId, dto);
        return ResponseEntity.ok(saveId);
    }

    /* 일정 DELETE */
    @DeleteMapping("/{saveId}")
    public ResponseEntity delete(@PathVariable int saveId) {
        scheduleService.delete(saveId);
        return ResponseEntity.ok(saveId);
    }

    /* todolist READ */
    @GetMapping("/{saveId}/todo")
    public List<TodoDto.Response> read(@PathVariable int saveId) {
        return todoService.findAll(saveId);
    }

    /* todolist CREATE */
    @PostMapping("/{saveId}/todo")
    public ResponseEntity save(@PathVariable int saveId, @RequestBody TodoDto.Request dto) {
        return ResponseEntity.ok(todoService.save(saveId, dto));
    }

    /* todolist UPDATE */
    @PutMapping({"/{saveId}/todo/{todoId}"})
    public ResponseEntity update(@PathVariable int todoId, @RequestBody TodoDto.Request dto) {
        todoService.update(todoId, dto);
        return ResponseEntity.ok(todoId);
    }

    /* todolist DELETE */
    @DeleteMapping("/{saveId}/todo/{todoId}")
    public ResponseEntity todoDelete(@PathVariable int todoId) {
        todoService.todoDelete(todoId);
        return ResponseEntity.ok(todoId);
    }


}
