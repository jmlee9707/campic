package com.web.curation.service;

import com.web.curation.data.dto.CampDto;
import com.web.curation.data.dto.ScheduleDto;
import com.web.curation.data.dto.SearchListDto;
import com.web.curation.data.dto.TagDto;
import com.web.curation.data.entity.CampTag;
import com.web.curation.data.entity.LikedCampList;
import com.web.curation.data.entity.TotalCampList;
import com.web.curation.data.entity.User;
import com.web.curation.data.repository.CampRepository;
import com.web.curation.data.repository.LikedCampRepository;
import com.web.curation.data.repository.TagRepository;
import com.web.curation.data.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.criteria.*;
import java.util.*;
import java.util.stream.Collectors;


@Service
public class CampService{
    private final CampRepository campRepository;
    private final LikedCampRepository likedCampRepository;
    private final UserRepository userRepository;
    private final TagRepository tagRepository;
    EntityManager entityManager;

    @Autowired
    public CampService(CampRepository campRepository, LikedCampRepository likedCampRepository, UserRepository userRepository, TagRepository tagRepository) {
        this.campRepository = campRepository;
        this.likedCampRepository = likedCampRepository;
        this.userRepository = userRepository;
        this.tagRepository = tagRepository;
    }

    public List<CampDto.CampList> filterCampList(SearchListDto.SearchList searchList) {

        List<TotalCampList> totalCampLists = new ArrayList<>();

        if(searchList.getKeyword()==null && searchList.getTags().isEmpty() && searchList.getGugun()==null && searchList.getSido()==null){
            totalCampLists = campRepository.findAll();
        }else{
            totalCampLists = campRepository.findAll(searchCamps(searchList));
        }

        List<CampDto.CampList> filterCampList = new ArrayList<>();
        Pageable pageable = PageRequest.of(searchList.getPage(), 10);
        final int start = (int)pageable.getOffset();
        final int end = Math.min((start + pageable.getPageSize()), totalCampLists.size());
        Page<TotalCampList> ptl = new PageImpl<>(totalCampLists.subList(start,end),pageable ,totalCampLists.size());

        for (TotalCampList cl : ptl){
            CampDto.CampList tcl = new CampDto.CampList(cl);
            filterCampList.add(tcl);
        }

        return filterCampList;

    }


    public Specification<TotalCampList> searchCamps(SearchListDto.SearchList searchList){
        return ((cl, criteriaQuery, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if(searchList.getKeyword() != null){
                String keyword = "%"+searchList.getKeyword()+"%";
                Predicate keywordSearch = criteriaBuilder.like(cl.get("facltNm"),keyword);
                predicates.add(keywordSearch);
            }

            if(searchList.getSido() != null && searchList.getGugun() != null){
                String sido = searchList.getSido()+"%";
                String sigungu = searchList.getGugun()+"%";
                Predicate regionSearchdoNm = criteriaBuilder.like(cl.get("doNm"),sido);
                Predicate regionSearchsigungu = criteriaBuilder.like(cl.get("sigunguNm"),sigungu);
                Predicate regionSearch = criteriaBuilder.and(regionSearchdoNm,regionSearchsigungu);
                predicates.add(regionSearch);
            }

            if(!searchList.getTags().isEmpty()){
                Subquery<Integer> subquery = criteriaQuery.subquery(Integer.class);
                Root<CampTag> s = subquery.from(CampTag.class);
                Join<TotalCampList, CampTag> ts = s.join("totalCampList");
                subquery.select(ts.get("campId")).distinct(true).where(s.get("hashtag").in(searchList.getTags()));
                Predicate tagSearch = cl.get("campId").in(subquery);
                predicates.add(tagSearch);
            }

            if(searchList.getArrange() == 0){
                criteriaQuery.orderBy(criteriaBuilder.asc(cl.get("facltNm")));  // 가나다순 정렬
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });
    }




//    public List<CampDto.CampList> filterCampList(SearchListDto.SearchList searchList){
//        List<TotalCampList> totalCampLists = new ArrayList<>();
//        List<CampDto.CampList> filterCampList = new ArrayList<>();
//        /* 전체 리스트 */
//        if(searchList.getKeyword()==null && searchList.getTags()==null &&
//                searchList.getGugun()==null && searchList.getSido()==null){
//            totalCampLists = getAllCamps();
//        }
//        /* 키워드 검색 필터링 */
//        if (searchList.getKeyword() != null){
//            List<TotalCampList> kwSid = keywordSearchCampList(searchList.getKeyword());
//            for (TotalCampList k : kwSid){
//                totalCampLists.remove(k);
//            }
//        }
//
//        /* 지역 검색 필터링 */
//        if (searchList.getSido() != null && searchList.getGugun() != null){
//            List<TotalCampList> rgSlist = regionSearchCampList(searchList.getSido(), searchList.getGugun());
//            for (TotalCampList r : rgSlist){
//                totalCampLists.remove(r);
//            }
//        }
//
//        /* 태그 겁색 필터링 */
//        if (searchList.getTags() != null){
//            List<TotalCampList> tagSearchCampList = tagSearchCampList(searchList.getTags());
//            for (TotalCampList ts : tagSearchCampList){
//                totalCampLists.add(ts);
//            }
//        }
//
//        Pageable pageable = PageRequest.of(searchList.getPage(), 10);
//        final int start = (int)pageable.getOffset();
//        final int end = Math.min((start + pageable.getPageSize()), totalCampLists.size());
//        Page<TotalCampList> ptl = new PageImpl<>(totalCampLists.subList(start,end),pageable ,totalCampLists.size());
//
//        for (TotalCampList cl : ptl){
//            CampDto.CampList tcl = new CampDto.CampList(cl);
//            filterCampList.add(tcl);
//        }
//
//        return filterCampList;
//    }





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

    public List<TotalCampList> getAllCamps() {
        List<TotalCampList> totalCampList = campRepository.findAll();
        return totalCampList;
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
    public List<TotalCampList> keywordSearchCampList(String keyword){
        List<TotalCampList> kwSearchCampList = campRepository.findByFacltNmNotContains(keyword);
        return kwSearchCampList;
    }

    /* camp 지역 검색 결과 리스트 READ */
    @Transactional(readOnly = true)
    public List<TotalCampList> regionSearchCampList(String doname, String sigungu){
        List<TotalCampList> regionSearchCampList = campRepository.findByDoNmAndSigunguNmStartsWith(doname,sigungu);
        return regionSearchCampList;
    }

    /* camp 태그 검색 결과 리스트 READ */
    @Transactional(readOnly = true)
    public List<TotalCampList> tagSearchCampList(List<String> taglist){
        List<TagDto.SearchedTag> selecteds = tagRepository.findDistinctByAndHashtagIn(taglist);

        List<TotalCampList> tagSearchCampList = new ArrayList<>();;
        for (TagDto.SearchedTag s : selecteds){
            TotalCampList camp = campRepository.getByCampId(s.getCampId());
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
