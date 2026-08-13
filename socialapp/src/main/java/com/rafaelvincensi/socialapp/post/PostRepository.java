package com.rafaelvincensi.socialapp.post;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PostRepository extends JpaRepository <PostModel, Long> {

    List<PostModel> findByUserId(Long userId);
    List<PostModel> findAllByOrderByCreatedAtDesc();
}
