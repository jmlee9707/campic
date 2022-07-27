package com.web.curation.data.repository;

import com.web.curation.data.dto.ScheduleDto;
import com.web.curation.data.entity.LikedCampList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikedCampRepository  extends JpaRepository<LikedCampList, Integer> {
    LikedCampList getById(int saveId);
}


//public interface CampRepository extends JpaRepository<TotalCampList, Integer> {
//}