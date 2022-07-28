package com.web.curation.service;

import com.web.curation.data.dto.PhotoDto;
import com.web.curation.data.dto.TalkDto;
import com.web.curation.data.entity.*;
import com.web.curation.data.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class TalkService {
    private final Logger LOGGER = LoggerFactory.getLogger(TalkService.class);
    private final TalkRepository talkRepository;
    private final TalkLikeRepository talkLikeRepository;
    private final UserRepository userRepository;
    private final ThumbnailFileRepository thumbnailFileRepository;

    @Autowired
    public TalkService(TalkRepository talkRepository,TalkLikeRepository talkLikeRepository,ThumbnailFileRepository thumbnailFileRepository, UserRepository userRepository) {
        this.talkRepository = talkRepository;
        this.thumbnailFileRepository = thumbnailFileRepository;
        this.talkLikeRepository = talkLikeRepository;
        this.userRepository = userRepository;
    }

    public List<TalkDto> listTalk() {
        List<Talk> listTalks = talkRepository.findAll();

        return getTalkDtos(listTalks);
    }

    public List<TalkDto> bestTalk() {
        List<Talk> listTalk = talkRepository.findTop8ByOrderByClickDesc();
        return getTalkDtos(listTalk);
    }

    public List<TalkDto> userTalk(int userId) {
        List<Talk> listTalk = talkRepository.findByUser(userRepository.findByUserId(userId));
        return getTalkDtos(listTalk);
    }


    private List<TalkDto> getTalkDtos(List<Talk> talks) {
        List<TalkDto> listTalk = new ArrayList<>();

        for(Talk talk : talks){

            TalkDto talkDto = new TalkDto();
            talkDto.setProfileImgPath(talk.getUser().getProfileImg());
            talkDto.setTalkId(talk.getTalkId());
            talkDto.setNickname(talk.getUser().getNickname());
            talkDto.setUploadDate(talk.getUploadDate());
            talkDto.setTitle(talk.getTitle());
            talkDto.setThumbnailFileName(talk.getThumbnailFile().getName());
            talkDto.setThumbnailFilePath(talk.getThumbnailFile().getFilePath());
            talkDto.setHashtag(talk.getHashtag());

            // 좋아요 수
            Long countLike = talkLikeRepository.countByTalk(talk);
            talkDto.setLike(countLike);

            // 조회수
            talkDto.setClick(talk.getClick());

            talkDto.setTalkContents(talk.getTalkContents());

            listTalk.add(talkDto);
        }

        return listTalk;
    }

    public boolean writeTalk(TalkDto talkDto) {
        LOGGER.info("[talk 게시글 등록] 게시글 제목 : {}", talkDto.getTitle());
        // talk 저장
        Talk talk = new Talk();

        talk.setTitle(talkDto.getTitle());
        talk.setHashtag(talkDto.getHashtag());
        User user = userRepository.getByNickname(talkDto.getNickname());
        System.out.println(user.getNickname() + " "+ user.getUserId());
        talk.setUser(user);
        talk.setUploadDate(LocalDateTime.now());
        talk.setClick(0);

        Talk savedTalk = talkRepository.save(talk);

        // thumbnailFile 저장
        ThumbnailFile thumbnailFile = new ThumbnailFile();
        thumbnailFile.setFilePath(talkDto.getThumbnailFilePath());
        thumbnailFile.setName(talkDto.getThumbnailFileName());

        thumbnailFileRepository.save(thumbnailFile);


        // TalkContent 저장 받아오는거 따라서 만들어야함.


        LOGGER.info("[getSignUpResult] userEntity 값이 들어왔는지 확인 후 결과값 주입");
        if (savedTalk != null) {
            LOGGER.info("talk 게시글 저장 완료");
            return true;
        } else {
            LOGGER.info("talk 게시글 저장 실패");
            return false;
        }
    }






    public boolean pushLike(int talkId, String email) {
        Talk talk = talkRepository.findByTalkId(talkId);

        User user = userRepository.getByEmail(email);

        TalkLike talkLike = new TalkLike();
        talkLike.setTalk(talk);
        talkLike.setUser(user);

        talkLikeRepository.save(talkLike);

        TalkLike savedTalkLike = talkLikeRepository.findByLikeId(talkLike.getLikeId());

        if (savedTalkLike != null) {
            LOGGER.info("push like 완료");
            return true;
        } else {
            LOGGER.info("push like 실패");
            return false;
        }
    }


    public boolean cancelLike(int talkId, String email) {

        Talk talk = talkRepository.findByTalkId(talkId);
        User user = userRepository.getByEmail(email);

        TalkLike talkLike = talkLikeRepository.findByTalkAndUser(talk, user);

        talkLikeRepository.delete(talkLike);

        if(!talkLikeRepository.existsByLikeId(talkLike.getLikeId())) return true;
        return false;
    }



}
