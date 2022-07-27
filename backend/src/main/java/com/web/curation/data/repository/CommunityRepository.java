package com.web.curation.data.repository;

import com.web.curation.data.entity.Community;
import com.web.curation.data.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommunityRepository extends JpaRepository<Community, Integer> {
    List<Community> findTop8ByOrderByClickDesc();
    Community findByBoardId(int id);
    List<Community> findByUser(User user);
}
