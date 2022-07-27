package com.web.curation.data.repository;

import com.web.curation.data.entity.Community;
import com.web.curation.data.entity.CommunityFile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommunityFileRepository extends JpaRepository<CommunityFile, Integer> {
    CommunityFile findByCommunity(Community community);
}
