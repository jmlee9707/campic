package com.web.curation.data.repository;

import com.web.curation.data.entity.Talk;
import com.web.curation.data.entity.ThumbnailFile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ThumbnailFileRepository extends JpaRepository<ThumbnailFile, Integer> {
    ThumbnailFile findByTalk(Talk talk);
}
