package com.web.curation.data.repository;

import com.web.curation.data.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TalkLikeRepository extends JpaRepository<TalkLike, Integer> {
    int countByTalk(Talk talk);

    TalkLike findByLikeId(int id);

    TalkLike findByTalkAndUser(Talk talk, User user);

    boolean existsByLikeId(int likeId);
    boolean existsByUserAndTalk(User user, Talk talk);
}
