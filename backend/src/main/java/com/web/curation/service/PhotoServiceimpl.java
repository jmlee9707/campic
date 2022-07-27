package com.web.curation.service;

import com.web.curation.data.dto.PhotoDto;
import com.web.curation.data.entity.Community;
import com.web.curation.data.entity.CommunityFile;
import com.web.curation.data.entity.CommunityLike;
import com.web.curation.data.entity.User;
import com.web.curation.data.repository.CommunityFileRepository;
import com.web.curation.data.repository.CommunityLikeRepository;
import com.web.curation.data.repository.CommunityRepository;
import com.web.curation.data.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    @Override
    public List<PhotoDto> listPhoto() {
        List<Community> listCommunity = communityRepository.findAll();

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

    private List<PhotoDto> getPhotoDtos(List<Community> listCommunity) {
        List<PhotoDto> listPhoto = new ArrayList<>();

        for(Community community : listCommunity){

            PhotoDto photoDto = new PhotoDto();
            photoDto.setProfileImgPath(community.getUser().getProfileImg());

            photoDto.setBoardId(community.getBoardId());
            photoDto.setTitle(community.getTitle());
            photoDto.setNickname(community.getUser().getNickname());
            photoDto.setContent(community.getContent());
            photoDto.setHashtag(community.getHashtag());
            photoDto.setUploadDate(community.getUploadDate());
            
            // 좋아요 수
            Long countLike = communityLikeRepository.countByCommunity(community);
            photoDto.setLike(countLike);
            
            // 조회수
            photoDto.setClick(community.getClick());
            // photo인지 talk인지
            photoDto.setDType(community.getDType());


            CommunityFile communityFile = communityFileRepository.findByCommunity(community);
            photoDto.setFileName(communityFile.getName());
            photoDto.setFilePath(communityFile.getFilePath());

            listPhoto.add(photoDto);
        }

        return listPhoto;
    }

    @Override
    public boolean writePhoto(PhotoDto photoDto) {
        LOGGER.info("[photo 게시글 등록] 게시글 제목 : {}", photoDto.getTitle());
        // community 저장
        Community community = new Community();

        community.setTitle(photoDto.getTitle());
        community.setContent(photoDto.getContent());
        community.setHashtag(photoDto.getHashtag());
        User user = userRepository.getByNickname(photoDto.getNickname());
        System.out.println(user.getNickname() + " "+ user.getUserId());
        community.setUser(user);
        community.setUploadDate(LocalDateTime.now());
        community.setClick(0);
        community.setDType(2);

        Community savedCommunity = communityRepository.save(community);

        // communityFile 저장
        CommunityFile communityFile = new CommunityFile();
        communityFile.setCommunity(community);
        communityFile.setFilePath(photoDto.getFilePath());
        communityFile.setName(photoDto.getFileName());

        communityFileRepository.save(communityFile);

        LOGGER.info("[getSignUpResult] userEntity 값이 들어왔는지 확인 후 결과값 주입");
        if (savedCommunity != null) {
            LOGGER.info("photo 게시글 저장 완료");
            return true;
        } else {
            LOGGER.info("photo 게시글 저장 실패");
            return false;
        }
    }

    @Override
    public boolean updatePhoto(PhotoDto photoDto) {

        Community community = communityRepository.findByBoardId(photoDto.getBoardId());

        community.setTitle(photoDto.getTitle());
        community.setContent(photoDto.getContent());
        community.setHashtag(photoDto.getHashtag());

        communityRepository.save(community);

        // file 이미지 변경하기
        CommunityFile communityFile = communityFileRepository.findByCommunity(community);

        communityFile.setCommunity(community);
        communityFile.setName(photoDto.getFileName());
        communityFile.setFilePath(photoDto.getFilePath());

        communityFileRepository.save(communityFile);

        if(community.getTitle().equals(photoDto.getTitle()) && community.getContent().equals(photoDto.getContent())
        && community.getHashtag().equals(photoDto.getHashtag())){
            return true;
        }
        return false;
    }

    @Override
    public boolean deletePhoto(int boardId) {
        // 게시글 삭제
        Community community = communityRepository.findByBoardId(boardId);
        communityRepository.delete(community);
        // 사진 삭제
        CommunityFile communityFile = communityFileRepository.findByCommunity(community);
        communityFileRepository.delete(communityFile);

        Community verify = communityRepository.findByBoardId(boardId);

        if(verify == null) return true;
        return false;
    }

    @Override
    public boolean pushLike(int boardId, String email) {
        Community community = communityRepository.findByBoardId(boardId);

        User user = userRepository.getByEmail(email);

        CommunityLike communityLike = new CommunityLike();
        communityLike.setCommunity(community);
        communityLike.setUser(user);

        communityLikeRepository.save(communityLike);

        CommunityLike savedCommunityLike = communityLikeRepository.findByLikeId(communityLike.getLikeId());

        if (savedCommunityLike != null) {
            LOGGER.info("push like 완료");
            return true;
        } else {
            LOGGER.info("push like 실패");
            return false;
        }
    }

    @Override
    public boolean cancelLike(int boardId, String email) {

        Community community = communityRepository.findByBoardId(boardId);
        User user = userRepository.getByEmail(email);

        CommunityLike communityLike = communityLikeRepository.findByCommunityAndUser(community, user);

        communityLikeRepository.delete(communityLike);

        if(!communityLikeRepository.existsByLikeId(communityLike.getLikeId())) return true;
        return false;
    }

}
