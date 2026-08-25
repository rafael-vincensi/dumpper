package com.rafaelvincensi.socialapp.follow;

import com.rafaelvincensi.socialapp.user.UserModel;
import com.rafaelvincensi.socialapp.user.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FollowService {

    private final UserRepository userRepository;
    private final FollowRepository followRepository;

    public FollowService(FollowRepository followRepository, UserRepository userRepository) {
        this.followRepository = followRepository;
        this.userRepository = userRepository;
    }

    public List<UserModel> getFollowing(Long userId) {
        UserModel user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("Usuario nao encontrado!"));

        return followRepository.findByFollower(user)
                .stream()
                .map(FollowModel::getFollowing)
                .collect(Collectors.toList());
    }

    @Transactional
    public void unfollow(Long followerId, Long followingId){
        UserModel follower = userRepository.findById(followerId).orElseThrow(() -> new RuntimeException("Seguidor não encontrado"));
        UserModel following = userRepository.findById(followingId).orElseThrow(() -> new RuntimeException("Usuario seguido nao encontrado!"));

        if (followRepository.existsByFollowerAndFollowing(follower, following)){
            followRepository.deleteByFollowerAndFollowing(follower, following);

            int currentFollowing = follower.getFollowing() != null ? follower.getFollowing() : 0;
            int currentFollowers = following.getFollowers() != null ? following.getFollowers() : 0;

            follower.setFollowing(Math.max(0, currentFollowing - 1));
            following.setFollowers(Math.max(0, currentFollowers - 1));

            userRepository.save(follower);
            userRepository.save(following);
        }
    }

    @Transactional
    public void follow(Long followerId,Long followingId){
        UserModel follower = userRepository.findById(followerId).orElseThrow(() -> new RuntimeException("Seguidor nao encontrado!"));
        UserModel following = userRepository.findById(followingId).orElseThrow(() -> new RuntimeException("Usuario seguido nao encontado!"));

        if (!followRepository.existsByFollowerAndFollowing(follower, following)){
            FollowModel follow = new FollowModel(follower, following);
            followRepository.save(follow);

            int currentFollowing = follower.getFollowing() != null ? follower.getFollowing() : 0;
            int currentFollowers = following.getFollowers() != null ? following.getFollowers() : 0;

            follower.setFollowing(currentFollowing + 1);
            following.setFollowers(currentFollowers + 1);

            userRepository.save(follower);
            userRepository.save(following);
        }
    }

    public List<UserModel> getFollower(Long userId){
        UserModel user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("Usuario nao encontrado!"));

        return followRepository.findByFollowing(user)
                .stream()
                .map(FollowModel::getFollower)
                .collect(Collectors.toList());

    }

    public Boolean isFollowing(Long followerId, Long followingId){
        UserModel follower = userRepository.findById(followerId).orElseThrow(() -> new RuntimeException("Seguidor nao encontrado!"));
        UserModel following = userRepository.findById(followingId).orElseThrow(() -> new RuntimeException ("Usuario seguido nao encontrado!"));

        return followRepository.existsByFollowerAndFollowing(follower, following);
    }

    public List<UserModel> getFriends(Long userId){

        List<UserModel> following = getFollowing(userId);
        List<UserModel> follower = getFollower(userId);

        return following.stream()
                .filter(follower::contains)
                .collect(Collectors.toList());
    }

}
