package com.rafaelvincensi.socialapp.like;

import com.rafaelvincensi.socialapp.post.PostModel;
import com.rafaelvincensi.socialapp.user.UserModel;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/likes")
@CrossOrigin(origins = "*")
public class LikeController {

    private LikeService likeService;

    public LikeController(LikeService likeService) {
        this.likeService = likeService;
    }

    @PostMapping("/{userId}/{postId}")
    public PostModel curtirPost(@PathVariable Long userId, @PathVariable Long postId){
        return likeService.curtirPost(userId, postId);
    }

    @GetMapping("/{postId}")
    public List<UserModel> listarUserQueCurtiu(@PathVariable long postId){
        return likeService.listarUserQueCurtiu(postId);
    }

}
