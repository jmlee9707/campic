package com.web.curation.data.repository;

import com.web.curation.data.entity.Community;
import com.web.curation.data.entity.CommunityLike;
import com.web.curation.data.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommunityLikeRepository extends JpaRepository<CommunityLike, Integer> {

    long countByCommunity(Community community);

    CommunityLike findByLikeId(int id);

    CommunityLike findByCommunityAndUser(Community community, User user);

    boolean existsByLikeId(int likeId);
}
