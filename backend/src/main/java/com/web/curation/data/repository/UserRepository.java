package com.web.curation.data.repository;

import com.web.curation.data.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
    User getByEmail(String email);
    User getByNickname(String nickName);
    User findByUserId(int userId);
    boolean existsByEmail(String email);
    boolean existsByTel(String tel);
    User getByTel(String tel);
}
