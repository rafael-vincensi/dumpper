package com.rafaelvincensi.socialapp.like;

import com.rafaelvincensi.socialapp.post.PostModel;
import com.rafaelvincensi.socialapp.post.PostRepository;
import com.rafaelvincensi.socialapp.user.UserModel;
import com.rafaelvincensi.socialapp.user.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LikeService {

    private final LikeRepository likeRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;

    public LikeService(LikeRepository likeRepository, UserRepository userRepository, PostRepository postRepository) {
        this.likeRepository = likeRepository;
        this.userRepository = userRepository;
        this.postRepository = postRepository;
    }

    @Transactional
    public PostModel curtirPost(Long userId, Long postId) {
        PostModel post = postRepository.findById(postId).orElseThrow();
        Optional <LikeModel> likeExistente = likeRepository.findByUserIdAndPostId(userId, postId);

        if (likeExistente.isPresent()) {
            likeRepository.delete(likeExistente.get());

            int novoTotal = Math.max(0, post.getLikesCount() - 1);
            post.setLikesCount(novoTotal);
            return postRepository.save(post);
        }

        UserModel user = userRepository.findById(userId).orElseThrow();

        LikeModel like = new LikeModel();
        like.setUser(user);
        like.setPost(post);
        likeRepository.save(like);

        post.setLikesCount(post.getLikesCount() + 1);
        return postRepository.save(post);
    }

    public List<UserModel> listarUserQueCurtiu(Long postId) {
        List<LikeModel> like = likeRepository.findByPostId(postId);
        return like.stream()
                .map(LikeModel::getUser)
                .toList();
    }

    public boolean userLike(Long userId, Long postId) {
        return likeRepository.existsByUserIdAndPostId(userId, postId);
    }
}