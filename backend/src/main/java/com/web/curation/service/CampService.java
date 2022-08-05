package com.web.curation.service;

import com.web.curation.data.dto.CampDto;
import com.web.curation.data.dto.ScheduleDto;
import com.web.curation.data.dto.TagDto;
import com.web.curation.data.entity.LikedCampList;
import com.web.curation.data.entity.TotalCampList;
import com.web.curation.data.entity.User;
import com.web.curation.data.repository.CampRepository;
import com.web.curation.data.repository.LikedCampRepository;
import com.web.curation.data.repository.TagRepository;
import com.web.curation.data.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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
    private final TagRepository tagRepository;

    @Autowired
    public CampService(CampRepository campRepository, LikedCampRepository likedCampRepository, UserRepository userRepository, TagRepository tagRepository) {
        this.campRepository = campRepository;
        this.likedCampRepository = likedCampRepository;
        this.userRepository = userRepository;
        this.tagRepository = tagRepository;
    }

    /* campList READ */
    @Transactional(readOnly = true)
    public List<CampDto.CampList> getAllCamps(int page) {
        PageRequest pageRequest = PageRequest.of(page, 10);
        Page<TotalCampList> totalCampList = campRepository.findAll(pageRequest);
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

    /* camp 지역 검색 결과 리스트 READ */
    @Transactional(readOnly = true)
    public List<CampDto.CampList> regionSearchCampList(String doname, String sigungu){
        List<CampDto.CampList> regionSearchCampList = campRepository.findByDoNmAndSigunguNmStartsWith(doname,sigungu);
        return regionSearchCampList;
    }

    /* camp 태그 검색 결과 리스트 READ */
    @Transactional(readOnly = true)
    public List<CampDto.CampList> tagSearchCampList(List<String> taglist){
        List<TagDto.SearchedTag> selecteds = tagRepository.findDistinctByAndHashtagIn(taglist);
        List<CampDto.CampList> tagSearchCampList = new ArrayList<>();;
        for (TagDto.SearchedTag s : selecteds){
            CampDto.CampList camp = campRepository.getByCampId(s.getCampId());
            System.out.println(camp.getCampId());
            tagSearchCampList.add(camp);
        }

        return tagSearchCampList;
    }



    /* CREATE */
    @Transactional
    public int save(ScheduleDto.Request dto, String email, int campId) {
        /* User 정보를 가져와 dto에 담아준다. */
        User user = userRepository.getByEmail(email); // email로?
        dto.setUserId(user);
        TotalCampList camp = campRepository.getById(campId);
        dto.setCampId(camp);

        LikedCampList likedCampList = dto.toEntity();
        likedCampRepository.save(likedCampList);

        return likedCampList.getSaveId();
    }

}
