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

import java.time.LocalDate;
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
    public List<ScheduleDto.Response> upcomingList(String email, String now){
        User user = userRepository.getByEmail(email);
        List<ScheduleDto.Response> upcomingList = likedCampRepository.findAllByUserAndStartDateAfterOrderByStartDateDesc(user, now);
        return upcomingList;
    }

    @Transactional(readOnly = true)
    public List<ScheduleDto.Response> ongoingList(String email, String now){
        User user = userRepository.getByEmail(email);
        List<ScheduleDto.Response> ongoingList = likedCampRepository.findAllByUserAndStartDateBeforeAndEndDateAfter(user, now, now);
        return ongoingList;
    }

    @Transactional(readOnly = true)
    public List<ScheduleDto.Response> endList(String email, String now){
        User user = userRepository.getByEmail(email);
        List<ScheduleDto.Response> endList = likedCampRepository.findAllByUserAndEndDateBeforeOrderByEndDateAsc(user, now);
        return endList;
    }


    @Transactional(readOnly = true)
    public ScheduleDto.ScheduleDetail scheduleDetailRead(int saveId) {
        LikedCampList likedCampList = likedCampRepository.findById(saveId).orElseThrow(() ->
            new IllegalArgumentException("?????? ???????????? ???????????? ????????????. id: " + saveId));

        return new ScheduleDto.ScheduleDetail(likedCampList);
    }


    /* UPDATE (dirty checking ????????? ????????????)
     *  User ????????? ??????????????????, ???????????? User ????????? ????????? ???????????? ????????????
     * ??????????????? ?????? ??? ???????????? DB??? ???????????????. */
    @Transactional
    public boolean update(int saveId, ScheduleDto.Request dto) {
        LikedCampList likedCampList = likedCampRepository.getById(saveId); // orElseThrow(() ->
//                new IllegalArgumentException("?????? ???????????? ???????????? ????????????. id=" + saveId));

        likedCampList.update(dto.getStartDate(), dto.getEndDate(), dto.getSavedTitle() );

        if(likedCampList.getSavedTitle().equals(dto.getSavedTitle())
                && likedCampList.getStartDate().equals(dto.getStartDate())
                && likedCampList.getEndDate().equals(dto.getEndDate())){
            return true;
        }
        return false;

    }


    /* DELETE */
    @Transactional
    public boolean delete(int saveId) {
        LikedCampList likedCampList = likedCampRepository.getById(saveId);
        likedCampRepository.delete(likedCampList);
        LikedCampList verify = likedCampRepository.getById(saveId);

        if(verify == null) return true;
        return false;
    }


    /* READ ????????? ????????? ?????? readOnly ???????????? ???????????? ?????? */
    @Transactional(readOnly = true)
    public ScheduleDto.Response findById(int saveId) {
        LikedCampList likedCampList = likedCampRepository.findById(saveId).orElseThrow(() ->
                new IllegalArgumentException("?????? ???????????? ???????????? ????????????. id: " + saveId));

        return new ScheduleDto.Response(likedCampList);
    }

}
