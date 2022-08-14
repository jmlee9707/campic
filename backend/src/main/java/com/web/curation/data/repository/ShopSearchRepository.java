package com.web.curation.data.repository;

import com.web.curation.data.entity.ShopSearch;
import com.web.curation.data.entity.Sidocode;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ShopSearchRepository  extends JpaRepository<ShopSearch, Integer> {

    @Query("SELECT s.searchWord FROM ShopSearch s group by s.searchWord order by count(s.searchId) desc ")
    List<String> findTop5(Pageable limit5);
}
