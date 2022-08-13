package com.web.curation.service;

import com.web.curation.data.dto.CampDto;
import com.web.curation.data.dto.PhotoDto;
import com.web.curation.data.entity.*;
import com.web.curation.data.repository.CommunityFileRepository;
import com.web.curation.data.repository.CommunityLikeRepository;
import com.web.curation.data.repository.CommunityRepository;
import com.web.curation.data.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.Base64Utils;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class PhotoServiceimpl implements PhotoService {

    private final Logger LOGGER = LoggerFactory.getLogger(PhotoServiceimpl.class);

    private final CommunityRepository communityRepository;
    private final CommunityFileRepository communityFileRepository;
    private final CommunityLikeRepository communityLikeRepository;
    private final UserRepository userRepository;

    @Autowired
    public PhotoServiceimpl(CommunityRepository communityRepository, CommunityFileRepository communityFileRepository, CommunityLikeRepository communityLikeRepository, UserRepository userRepository) {
        this.communityRepository = communityRepository;
        this.communityFileRepository = communityFileRepository;
        this.communityLikeRepository = communityLikeRepository;
        this.userRepository = userRepository;
    }
//    @Cacheable(value="photo")
    @Override
    public List<PhotoDto> listPhoto(int page) {
        Pageable sortedByPriceDesc =
                PageRequest.of(page, 15, Sort.by("uploadDate").descending());

        Page<Community> pageCommunity = communityRepository.findAll(sortedByPriceDesc);
        List<Community> listCommunity = new ArrayList<>();

        for(Community comm : pageCommunity){
              listCommunity.add(comm);
        }

        return getPhotoDtos(listCommunity);
    }

    @Override
    public List<PhotoDto> bestPhoto() {
        List<Community> listCommunity = communityRepository.findTop8ByOrderByClickDesc();
        return getPhotoDtos(listCommunity);
    }

    @Override
    public List<PhotoDto> userPhoto(String email) {
        List<Community> listCommunity = communityRepository.findByUser(userRepository.getByEmail(email));

        return getPhotoDtos(listCommunity);
    }

    @Override
    public PhotoDto detailPhoto(int boardId) {
        Community community = communityRepository.findByBoardId(boardId);
        // 상세 조회 시 조회 수 증가
        int cnt = community.getClick();
        community.setClick(cnt+1);
        communityRepository.save(community);

        PhotoDto photoDto = new PhotoDto();

//        photoDto.setProfileImgPath(community.getUser().getProfileImg());

        photoDto.setBoardId(community.getBoardId());
        photoDto.setNickname(community.getUser().getNickname());
        photoDto.setEmail(community.getUser().getEmail());
        photoDto.setContent(community.getContent());
        photoDto.setHashtag(community.getHashtag());
        photoDto.setUploadDate(community.getUploadDate());

        // 좋아요 수
        int countLike = communityLikeRepository.countByCommunity(community);
        photoDto.setLike(countLike);

        // 조회수
        photoDto.setClick(community.getClick());

        CommunityFile communityFile = communityFileRepository.findByCommunity(community);
        photoDto.setFileName(communityFile.getName());

        String blobFile = encodeBlobToBase64(communityFile.getFile());
        LOGGER.info("blobFile", blobFile);
        photoDto.setSaveFile(communityFile.getFile());
        photoDto.setBlobFile(blobFile);

        return photoDto;
    }

    private List<PhotoDto> getPhotoDtos(List<Community> listCommunity) {
        List<PhotoDto> listPhoto = new ArrayList<>();

        for(Community community : listCommunity){

            PhotoDto photoDto = new PhotoDto();

            if(community.getUser().getProfileImg() != null){
                photoDto.setProfileImgPath(encodeBlobToBase64(community.getUser().getProfileImg()));
            }

            photoDto.setBoardId(community.getBoardId());
//            photoDto.setEmail(community.getUser().getEmail());
            photoDto.setNickname(community.getUser().getNickname());
            photoDto.setContent(community.getContent());
            photoDto.setHashtag(community.getHashtag());
            photoDto.setUploadDate(community.getUploadDate());
            
            // 좋아요 수
            int countLike = communityLikeRepository.countByCommunity(community);
            photoDto.setLike(countLike);
            
            // 조회수
            photoDto.setClick(community.getClick());

            // 사진 넣기
            CommunityFile communityFile = communityFileRepository.findByCommunity(community);
            photoDto.setFileName(communityFile.getName());

            String blobFile = encodeBlobToBase64(communityFile.getFile());

            photoDto.setSaveFile(communityFile.getFile());
            photoDto.setBlobFile(blobFile);

            listPhoto.add(photoDto);
        }
        
        return listPhoto;
    }
    public static String encodeBlobToBase64(byte[] data){

        final String BASE_64_PREFIX = "data:image/png;base64,";
        String base64Str = Base64Utils.encodeToString(data);

        return BASE_64_PREFIX+base64Str;
    }
//    @CacheEvict(value = "photo", allEntries = true)
    @Transactional
    @Override
    public int writePhoto(PhotoDto photoDto) {
        LOGGER.info("[photo 게시글 등록] 게시글 ");
        // community 저장
        Community community = new Community();

        community.setContent(photoDto.getContent());
        community.setHashtag(photoDto.getHashtag());

        User user = userRepository.getByNickname(photoDto.getNickname());
        LOGGER.info("user nickname: {} ", user.getNickname());

        community.setUser(user);
        community.setUploadDate(LocalDateTime.now());
        community.setClick(0);

        Community savedCommunity = communityRepository.save(community);

        // communityFile 저장
        CommunityFile communityFile = new CommunityFile();
        communityFile.setCommunity(community);
        communityFile.setFile(photoDto.getSaveFile());
        LOGGER.info("photoDto FIleName() : ", photoDto.getFileName());
        communityFile.setName(photoDto.getFileName());

        communityFileRepository.save(communityFile);

        LOGGER.info("[getSignUpResult] userEntity 값이 들어왔는지 확인 후 결과값 주입");


        if (savedCommunity != null) {
            LOGGER.info("photo 게시글 저장 완료");
            int boardId = savedCommunity.getBoardId();
            return boardId;
        } else {
            LOGGER.info("photo 게시글 저장 실패");
            return 0;
        }
    }
//    @CacheEvict(value = "photo", allEntries = true)
    @Override
    public boolean updatePhoto(PhotoDto photoDto) {

        Community community = communityRepository.findByBoardId(photoDto.getBoardId());

        community.setContent(photoDto.getContent());
        community.setHashtag(photoDto.getHashtag());

        communityRepository.save(community);

        // file 이미지 변경하기
        CommunityFile communityFile = communityFileRepository.findByCommunity(community);

        communityFile.setCommunity(community);
        communityFile.setName(photoDto.getFileName());
        communityFile.setFile(photoDto.getSaveFile());

        communityFileRepository.save(communityFile);

        if(community.getContent().equals(photoDto.getContent()) && community.getHashtag().equals(photoDto.getHashtag())){
            return true;
        }
        return false;
    }

//    @CacheEvict(value = "photo", allEntries = true)
    @Transactional
    @Override
    public boolean deletePhoto(int boardId) {

        // 게시글 불러오고나서
        Community community = communityRepository.findByBoardId(boardId);
        // 사진 삭제한 다음에
        CommunityFile communityFile = communityFileRepository.findByCommunity(community);
        communityFileRepository.delete(communityFile);

        // 게시글 삭제
        communityRepository.delete(community);

        Community verify = communityRepository.findByBoardId(boardId);

        if(verify == null) return true;
        return false;
    }
//    @CacheEvict(value = "photo", allEntries = true)
    @Override
    public int pushLike(int boardId, String email) {
        Community community = communityRepository.findByBoardId(boardId);
        User user = userRepository.getByEmail(email);

        // 좋아요를 두번 누르면 fail
        if(communityLikeRepository.existsByUserAndCommunity(user, community)) return -1;

        CommunityLike communityLike = new CommunityLike();
        communityLike.setCommunity(community);
        communityLike.setUser(user);

        communityLikeRepository.save(communityLike);

//        CommunityLike savedCommunityLike = communityLikeRepository.findByLikeId(communityLike.getLikeId());
        // 좋아요 수
        int countLike = communityLikeRepository.countByCommunity(community);

        if (communityLikeRepository.existsByLikeId(communityLike.getLikeId())) {
            LOGGER.info("push like 완료");
            return countLike;
        } else {
            LOGGER.info("push like 실패");
            return -1;
        }
    }
//    @CacheEvict(value = "photo", allEntries = true)
    @Override
    public int cancelLike(int boardId, String email) {

        Community community = communityRepository.findByBoardId(boardId);
        User user = userRepository.getByEmail(email);

        CommunityLike communityLike = communityLikeRepository.findByCommunityAndUser(community, user);
        // 좋아요 수
        int countLike = communityLikeRepository.countByCommunity(community);

        // 좋아요 수가 1이면 fail
        if(countLike == 0) return -1;

        communityLikeRepository.delete(communityLike);

        if(!communityLikeRepository.existsByLikeId(communityLike.getLikeId())) return countLike-1;
        return -1;
    }

    @Override
    public int isUserLikedPhoto(int boardId, String email) {
        Community community = communityRepository.findByBoardId(boardId);
        User user = userRepository.getByEmail(email);

        // 좋아요가 눌러져 있으면 1을 반환
        if(communityLikeRepository.existsByUserAndCommunity(user, community)) return 1;
        // 좋아요가 안누러져 있으면 0을 반환
        return 0;
    }

}
