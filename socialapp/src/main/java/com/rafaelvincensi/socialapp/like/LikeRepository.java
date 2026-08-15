package com.rafaelvincensi.socialapp.like;

import com.rafaelvincensi.socialapp.post.PostModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<LikeModel, Long> {
    boolean existsByUserIdAndPostId(Long userId, Long postId);
    Optional<LikeModel> findByUserIdAndPostId(Long userId, Long postId);
    void deleteByUserIdAndPostId(Long userId, Long postId);
    List<LikeModel> findByPostId(Long postId);

    Long post(PostModel post);
}
