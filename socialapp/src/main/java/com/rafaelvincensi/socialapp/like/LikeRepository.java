package com.rafaelvincensi.socialapp.like;

import com.rafaelvincensi.socialapp.post.PostModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<LikeModel, Long> {

    @Query("SELECT COUNT(l) > 0 FROM LikeModel l WHERE l.user.id = :userId AND l.post.id = :postId")
    boolean existsByUserIdAndPostId(@Param("userId") Long userId, @Param("postId") Long postId);
    Optional<LikeModel> findByUserIdAndPostId(Long userId, Long postId);
    List<LikeModel> findByPostId(Long postId);

}