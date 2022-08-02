package com.web.curation.data.repository;

import com.web.curation.data.entity.Community;
import com.web.curation.data.entity.Talk;
import com.web.curation.data.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TalkRepository extends JpaRepository<Talk, Integer> {
    List<Talk> findTop8ByOrderByClickDesc();
    Talk findByTalkId(int id);
    List<Talk> findByUser(User user);
}
