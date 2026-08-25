package com.rafaelvincensi.socialapp.follow;

import com.rafaelvincensi.socialapp.user.UserModel;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/follow")
@CrossOrigin(origins = "*")
public class FollowController {

    private FollowService followService;

    public FollowController(FollowService followService) {
        this.followService = followService;
    }

    @PostMapping
    public ResponseEntity<Void> followUser(@RequestParam Long followerId, @RequestParam Long followingId){
        followService.follow(followerId, followingId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> unfollow(
            @RequestParam Long followerId,
            @RequestParam Long followingId){
        followService.unfollow(followerId, followingId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/following/{userId}")
    public ResponseEntity<List<UserModel>> getFollowing(@PathVariable Long userId){
        List<UserModel> following = followService.getFollowing(userId);
        return ResponseEntity.ok(following);
    }

    @GetMapping("/followers/{userId}")
    public ResponseEntity<List<UserModel>> getFollowers(@PathVariable Long userId){
        List<UserModel> followers = followService.getFollower(userId);
        return ResponseEntity.ok(followers);
    }

    @GetMapping("/check")
    public ResponseEntity<Boolean> isFollowing(
            @RequestParam Long followerId, @RequestParam Long followingId){
        Boolean status = followService.isFollowing(followerId, followingId);
        return ResponseEntity.ok(status);
    }

    @GetMapping("/{userId}/friends")
    public List<UserModel> getFriends(@PathVariable Long userId){
        return followService.getFriends(userId);
    }

}
