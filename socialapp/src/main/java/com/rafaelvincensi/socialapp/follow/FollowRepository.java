package com.rafaelvincensi.socialapp.follow;

import com.rafaelvincensi.socialapp.user.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FollowRepository extends JpaRepository<FollowModel, Long> {
    List<FollowModel> findByFollower(UserModel follower);
    List<FollowModel> findByFollowing(UserModel following);
    boolean existsByFollowerAndFollowing(UserModel follower, UserModel following);
    void deleteByFollowerAndFollowing(UserModel follower, UserModel following);

    UserModel id(Long id);
}


