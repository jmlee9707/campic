package com.web.curation.service;

import com.web.curation.data.dto.PhotoDto;
import com.web.curation.data.dto.TalkDto;
import com.web.curation.data.entity.*;
import com.web.curation.data.repository.*;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.Base64Utils;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
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
//    @Cacheable(value="talk")
    public List<TalkDto> listTalk(int page) {
        Pageable sortedByPriceDesc = PageRequest.of(page, 15, Sort.by("uploadDate").descending());

        Page<Talk> pageTalk = talkRepository.findAll(sortedByPriceDesc);
        List<Talk> listTalks = new ArrayList<>();

        for(Talk talk : pageTalk){
            listTalks.add(talk);
        }

        return getTalkDtos(listTalks);
    }

    public List<TalkDto> bestTalk() {
        List<Talk> listTalk = talkRepository.findTop6ByOrderByClickDesc();
        return getTalkDtos(listTalk);
    }

    public List<TalkDto> userTalk(String email) {
        List<Talk> listTalk = talkRepository.findByUser(userRepository.getByEmail(email));
        return getTalkDtos(listTalk);
    }

    public TalkDto detailTalk(int talkId) {
        Talk talk = talkRepository.findByTalkId(talkId);
        // 상세 조회 시 조회 수 증가
        int cnt = talk.getClick();
        talk.setClick(cnt+1);
        talkRepository.save(talk);

        TalkDto talkDto = new TalkDto();

//        talkDto.setProfileImgPath(talk.getUser().getProfileImg());

        talkDto.setTalkId(talk.getTalkId());
        talkDto.setEmail(talk.getUser().getEmail());
        talkDto.setNickname(talk.getUser().getNickname());
        talkDto.setTitle(talk.getTitle());
        talkDto.setContents(talk.getContents());
        talkDto.setHashtag(talk.getHashtag());
        talkDto.setUploadDate(talk.getUploadDate());

        // 좋아요 수
        int countLike = talkLikeRepository.countByTalk(talk);
        talkDto.setLike(countLike);

        // 조회수
        talkDto.setClick(talk.getClick());

        ThumbnailFile thumbnailFile = thumbnailFileRepository.findByTalk(talk);
        talkDto.setFileName(thumbnailFile.getName());

        String blobFile = encodeBlobToBase64(thumbnailFile.getFile());
        LOGGER.info("blobFile", blobFile);
        talkDto.setSaveFile(thumbnailFile.getFile());
        talkDto.setBlobFile(blobFile);
        return talkDto;
    }

    private List<TalkDto> getTalkDtos(List<Talk> talks) {
        List<TalkDto> listTalk = new ArrayList<>();

        for(Talk talk : talks){

            TalkDto talkDto = new TalkDto();

            if(talk.getUser().getProfileImg() !=null){
                talkDto.setProfileImgPath(encodeBlobToBase64(talk.getUser().getProfileImg()));
            }

            talkDto.setTalkId(talk.getTalkId());
            talkDto.setNickname(talk.getUser().getNickname());
            talkDto.setContents(talk.getContents());
            talkDto.setUploadDate(talk.getUploadDate());
            talkDto.setTitle(talk.getTitle());
            talkDto.setHashtag(talk.getHashtag());

            // 좋아요 수
            int countLike = talkLikeRepository.countByTalk(talk);
            talkDto.setLike(countLike);

            // 조회수
            talkDto.setClick(talk.getClick());

            // 사진 넣기
            ThumbnailFile thumbnailFile = thumbnailFileRepository.findByTalk(talk);
            talkDto.setFileName(thumbnailFile.getName());

            String blobFile = encodeBlobToBase64(thumbnailFile.getFile());

            talkDto.setSaveFile(thumbnailFile.getFile());
            talkDto.setBlobFile(blobFile);

            listTalk.add(talkDto);
        }

        return listTalk;
    }

    public static String encodeBlobToBase64(byte[] data){

        final String BASE_64_PREFIX = "data:image/png;base64,";
        String base64Str = Base64Utils.encodeToString(data);

        return BASE_64_PREFIX+base64Str;
    }

//    @CacheEvict(value = "talk", allEntries = true)
    @Transactional
    public int writeTalk(TalkDto talkDto) {
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
        talk.setContents(talkDto.getContents());

        Talk savedTalk = talkRepository.save(talk);

        // thumbnailFile 저장
        ThumbnailFile thumbnailFile = new ThumbnailFile();
        thumbnailFile.setTalk(talk);
        thumbnailFile.setFile(talkDto.getSaveFile());
        LOGGER.info("talkDto FIleName() : ", talkDto.getFileName());
        thumbnailFile.setName(talkDto.getFileName());

        thumbnailFileRepository.save(thumbnailFile);
        LOGGER.info("[getSignUpResult] userEntity 값이 들어왔는지 확인 후 결과값 주입");

        if (savedTalk != null) {
            LOGGER.info("talk 게시글 저장 완료");
            int talkId = savedTalk.getTalkId();
            return talkId;
        } else {
            LOGGER.info("talk 게시글 저장 실패");
            return 0;
        }
    }
//    @CacheEvict(value = "talk", allEntries = true)
    public boolean updateTalk(TalkDto talkDto) {

        Talk talk = talkRepository.findByTalkId(talkDto.getTalkId());

        talk.setTitle(talkDto.getTitle());
        talk.setContents(talkDto.getContents());
        talk.setHashtag(talkDto.getHashtag());

        talkRepository.save(talk);

        // file 이미지 변경하기
        ThumbnailFile thumbnailFile = thumbnailFileRepository.findByTalk(talk);

        thumbnailFile.setTalk(talk);
        thumbnailFile.setName(talkDto.getFileName());
        thumbnailFile.setFile(talkDto.getSaveFile());

        thumbnailFileRepository.save(thumbnailFile);

        if(talk.getTitle().equals(talkDto.getTitle()) && talk.getHashtag().equals(talkDto.getHashtag())){
            return true;
        }
        return false;
//        return true;
    }
//    @CacheEvict(value = "talk", allEntries = true)
    @Transactional
    public boolean deleteTalk(int talkId) {
        // 게시글 삭제
        Talk talk = talkRepository.findByTalkId(talkId);
        // 사진 삭제한 다음에
        ThumbnailFile thumbnailFile = thumbnailFileRepository.findByTalk(talk);
        thumbnailFileRepository.delete(thumbnailFile);

        // 게시글 삭제
        talkRepository.delete(talk);

        Talk verify = talkRepository.findByTalkId(talkId);

        if(verify == null) return true;
        return false;
    }
//    @CacheEvict(value = "talk", allEntries = true)
    public int pushLike(int talkId, String email) {
        Talk talk = talkRepository.findByTalkId(talkId);

        User user = userRepository.getByEmail(email);

        // 좋아요를 두번 누르면 fail
        if(talkLikeRepository.existsByUserAndTalk(user, talk)) return -1;

        TalkLike talkLike = new TalkLike();
        talkLike.setTalk(talk);
        talkLike.setUser(user);

        talkLikeRepository.save(talkLike);

//        TalkLike savedTalkLike = talkLikeRepository.findByLikeId(talkLike.getLikeId());
        // 좋아요 수
        int countLike = talkLikeRepository.countByTalk(talk);

        if (talkLikeRepository.existsByLikeId(talkLike.getLikeId())) {
            LOGGER.info("push like 완료");
            return countLike;
        } else {
            LOGGER.info("push like 실패");
            return -1;
        }
    }

//    @CacheEvict(value = "talk", allEntries = true)
    public int cancelLike(int talkId, String email) {

        Talk talk = talkRepository.findByTalkId(talkId);
        User user = userRepository.getByEmail(email);

        TalkLike talkLike = talkLikeRepository.findByTalkAndUser(talk, user);

        // 좋아요 수
        int countLike = talkLikeRepository.countByTalk(talk);

        // 좋아요 수가 1이면 fail
        if(countLike == 0) return -1;

        talkLikeRepository.delete(talkLike);

        if(!talkLikeRepository.existsByLikeId(talkLike.getLikeId())) return countLike-1;
        return -1;
    }

    public int isUserLikedTalk(int talkId, String email) {
        Talk talk = talkRepository.findByTalkId(talkId);
        User user = userRepository.getByEmail(email);

        // 좋아요가 눌러져 있으면 1을 반환
        if(talkLikeRepository.existsByUserAndTalk(user, talk)) return 1;
        // 좋아요가 안눌러져 있으면 0을 반환
        return 0;
    }

}
