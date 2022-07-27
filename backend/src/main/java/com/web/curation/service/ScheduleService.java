package com.web.curation.service;

import com.web.curation.data.dto.ScheduleDto;
import com.web.curation.data.entity.LikedCampList;
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
public class ScheduleService {
    private final CampRepository campRepository;
    private final LikedCampRepository likedCampRepository;
    private final UserRepository userRepository;

    @Autowired
    public ScheduleService(CampRepository campRepository, LikedCampRepository likedCampRepository, UserRepository userRepository) {
        this.campRepository = campRepository;
        this.likedCampRepository = likedCampRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public ScheduleDto.ScheduleDetail scheduleDetailRead(int saveId) {
        LikedCampList likedCampList = likedCampRepository.findById(saveId).orElseThrow(() ->
            new IllegalArgumentException("해당 게시글이 존재하지 않습니다. id: " + saveId));

        return new ScheduleDto.ScheduleDetail(likedCampList);
    }


    /* UPDATE (dirty checking 영속성 컨텍스트)
     *  User 객체를 영속화시키고, 영속화된 User 객체를 가져와 데이터를 변경하면
     * 트랜잭션이 끝날 때 자동으로 DB에 저장해준다. */
    @Transactional
    public void update(int saveId, ScheduleDto.Request dto) {
        LikedCampList likedCampList = likedCampRepository.getById(saveId); // orElseThrow(() ->
//                new IllegalArgumentException("해당 게시글이 존재하지 않습니다. id=" + saveId));

        likedCampList.update(dto.getStartDate(), dto.getEndDate(), dto.getSavedTitle() );
    }


    /* DELETE */
    @Transactional
    public void delete(int saveId) {
        LikedCampList likedCampList = likedCampRepository.getById(saveId); // orElseThrow(() ->
//                new IllegalArgumentException("해당 게시글이 존재하지 않습니다. id=" + id));

        likedCampRepository.delete(likedCampList);
    }


    /* READ 게시글 리스트 조회 readOnly 속성으로 조회속도 개선 */
    @Transactional(readOnly = true)
    public ScheduleDto.Response findById(int saveId) {
        LikedCampList likedCampList = likedCampRepository.findById(saveId).orElseThrow(() ->
                new IllegalArgumentException("해당 게시글이 존재하지 않습니다. id: " + saveId));

        return new ScheduleDto.Response(likedCampList);
    }

}
