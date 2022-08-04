package com.web.curation.service;

import com.web.curation.data.entity.Guguncode;
import com.web.curation.data.entity.Sidocode;
import com.web.curation.data.repository.GunguRepository;
import com.web.curation.data.repository.SidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RegionService {
    private final SidoRepository sidoRepository;
    private final GunguRepository gunguRepository;

    @Autowired
    public RegionService(SidoRepository regionRepository, GunguRepository gunguRepository){
        this.sidoRepository = regionRepository;
        this.gunguRepository = gunguRepository;
    }

    /* sido list */
    @Transactional(readOnly = true)
    public List<Sidocode> getAllSido(){
        List<Sidocode> sidoList = sidoRepository.findAll();
        return sidoList;
    }

    /* gungu list */
    @Transactional(readOnly = true)
    public List<Guguncode> getAllGungu(String sidocode){
        List<Guguncode> getAllGungu = gunguRepository.findAllByGunguCodeContains(sidocode);
        return getAllGungu;
    }

}
