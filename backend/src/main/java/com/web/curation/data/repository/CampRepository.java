package com.web.curation.data.repository;

import com.web.curation.data.dto.CampDto;
import com.web.curation.data.entity.TotalCampList;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface CampRepository extends JpaRepository<TotalCampList, Integer> {
    TotalCampList getById(int campId);
    List<CampDto.CampList> findByFacltNmContains(String keyword);
    List<CampDto.CampList> findByDoNmAndSigunguNm(String doNm, String sigunguNm);



}
