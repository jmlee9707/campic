package com.web.curation.service;

import com.web.curation.data.dto.PhotoDto;
import com.web.curation.data.entity.Community;

import java.util.List;

public interface PhotoService {
    List<PhotoDto> listPhoto();
    List<PhotoDto> bestPhoto();

    List<PhotoDto> userPhoto(String email);

    PhotoDto detailPhoto(int boardId);

    int writePhoto(PhotoDto photoDto);
    boolean updatePhoto(PhotoDto photoDto);
    boolean deletePhoto(int boardId);

    boolean pushLike(int boardId, String email);
    boolean cancelLike(int boardId, String email);
}
