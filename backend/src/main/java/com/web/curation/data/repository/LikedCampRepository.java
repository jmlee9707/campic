package com.web.curation.data.repository;

import com.web.curation.data.dto.ScheduleDto;
import com.web.curation.data.entity.LikedCampList;
import com.web.curation.data.entity.TotalCampList;
import com.web.curation.data.entity.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface LikedCampRepository  extends JpaRepository<LikedCampList, Integer> {
    LikedCampList getById(int saveId);
    List<ScheduleDto.Response> findAllByUserAndStartDateAfterOrderByStartDateDesc(User user, String now);
    List<ScheduleDto.Response> findAllByUserAndStartDateBeforeAndEndDateAfter(User user, String now1, String now2);
    List<ScheduleDto.Response> findAllByUserAndEndDateBeforeOrderByEndDateAsc(User user, String now);

    @Query("SELECT lcl.totalCampList FROM LikedCampList lcl Group By lcl.totalCampList order by count(lcl.totalCampList) desc")
    List<TotalCampList> findTopSelectedList(Pageable limit5);
}
