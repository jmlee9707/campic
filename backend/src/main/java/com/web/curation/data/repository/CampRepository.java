package com.web.curation.data.repository;

import com.web.curation.data.dto.CampDto;
import com.web.curation.data.dto.TagDto;
import com.web.curation.data.entity.TotalCampList;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface CampRepository extends JpaRepository<TotalCampList, Integer> {
    TotalCampList getById(int campId);
    List<CampDto.CampList> findByFacltNmContains(String keyword);
    List<CampDto.CampList> findByDoNmAndSigunguNmStartsWith(String doNm, String sigunguNm);
    CampDto.CampList getByCampId(int campId);

}
