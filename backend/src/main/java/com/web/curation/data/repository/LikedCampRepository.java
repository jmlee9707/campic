package com.web.curation.data.repository;

import com.web.curation.data.dto.ScheduleDto;
import com.web.curation.data.entity.LikedCampList;
import com.web.curation.data.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface LikedCampRepository  extends JpaRepository<LikedCampList, Integer> {
    LikedCampList getById(int saveId);
    List<ScheduleDto.Response> findAllByUserAndStartDateAfterOrderByStartDateDesc(User user, String now);
    List<ScheduleDto.Response> findAllByUserAndStartDateBeforeAndEndDateAfter(User user, String now1, String now2);
    List<ScheduleDto.Response> findAllByUserAndEndDateBeforeOrderByEndDateAsc(User user, String now);
}
