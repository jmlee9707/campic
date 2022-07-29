package com.web.curation.service;

import com.web.curation.data.dto.CampDto;
import com.web.curation.data.dto.ScheduleDto;
import com.web.curation.data.entity.LikedCampList;
import com.web.curation.data.entity.TotalCampList;
import com.web.curation.data.entity.User;
import com.web.curation.data.repository.CampRepository;
import com.web.curation.data.repository.LikedCampRepository;
import com.web.curation.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CampService{
    private final CampRepository campRepository;
    private final LikedCampRepository likedCampRepository;
    private final UserRepository userRepository;

    @Autowired
    public CampService(CampRepository campRepository, LikedCampRepository likedCampRepository, UserRepository userRepository) {
        this.campRepository = campRepository;
        this.likedCampRepository = likedCampRepository;
        this.userRepository = userRepository;
    }

    /* campList READ */
    @Transactional(readOnly = true)
    public List<CampDto.CampList> getAllCamps() {
        List<TotalCampList> totalCampList = campRepository.findAll();
        List<CampDto.CampList> rttotalCampList = new ArrayList<>();
        for(TotalCampList tcl : totalCampList){
            CampDto.CampList cl = new CampDto.CampList(tcl);
            rttotalCampList.add(cl);
        }
        return rttotalCampList;
    }

    /* campDetail READ */
    @Transactional(readOnly = true)
    public CampDto.CampDetail campDetailRead(int campId) {
        TotalCampList totalCampList = campRepository.findById(campId).orElseThrow(() ->
                new IllegalArgumentException("해당 캠핑장이 존재하지 않습니다. id: " + campId));

        return new CampDto.CampDetail(totalCampList);
    }

    /* camp 키워드 검색 결과 리스트 READ */
    @Transactional(readOnly = true)
    public List<CampDto.CampList> keywordSearchCampList(String keyword){
        List<CampDto.CampList> kwSearchCampList = campRepository.findByFacltNmContains(keyword);
        return kwSearchCampList;
    }


    /* CREATE */
    @Transactional
    public int save(ScheduleDto.Request dto, int userId, int campId) {
        /* User 정보를 가져와 dto에 담아준다. */
        User user = userRepository.getById(userId); // email로?
        dto.setUserId(user);
        TotalCampList camp = campRepository.getById(campId);
        dto.setCampId(camp);

        LikedCampList likedCampList = dto.toEntity();
        likedCampRepository.save(likedCampList);

        return likedCampList.getSaveId();
    }

}
