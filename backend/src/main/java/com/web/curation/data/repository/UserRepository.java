package com.web.curation.data.repository;

import com.web.curation.data.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
    User getByEmail(String email);
    boolean existsByEmail(String email);
}
