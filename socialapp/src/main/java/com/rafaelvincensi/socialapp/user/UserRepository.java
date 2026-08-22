package com.rafaelvincensi.socialapp.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<UserModel, Long> {
    UserModel findByUsername(String username);
    UserModel existsByUsername(String username);
    UserModel findByEmail(String email);
    List<UserModel> findByUsernameContainingIgnoreCaseOrNameContainingIgnoreCase (String username, String name);
}
