package com.rafaelvincensi.socialapp.like;

import com.rafaelvincensi.socialapp.user.UserModel;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RestController("/likes")
public class LikeController {

    private LikeService likeService;

    public LikeController(LikeService likeService) {
        this.likeService = likeService;
    }

    @PostMapping("/{userId}/{postId}")
    public LikeModel curtirPost(@PathVariable Long userId, @PathVariable Long postId){
        return likeService.curtirPost(userId, postId);
    }

    @DeleteMapping("/{userId}/{postId}")
    public void descurtirPost(@PathVariable Long userId, @PathVariable Long postId){
        likeService.descurtirPost(userId, postId);
    }

    @GetMapping("/{postId}")
    public List<UserModel> listarUserQueCurtiu(@PathVariable long postId){
        return likeService.listarUserQueCurtiu(postId);
    }

}
