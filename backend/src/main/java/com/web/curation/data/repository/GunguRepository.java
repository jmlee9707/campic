package com.web.curation.data.repository;

import com.web.curation.data.entity.Guguncode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GunguRepository extends JpaRepository<Guguncode, Integer> {
    List<Guguncode> findAllByGunguCodeStartsWith(String sidocode);
}
