package com.rafaelvincensi.socialapp.like;

import com.rafaelvincensi.socialapp.post.PostModel;
import com.rafaelvincensi.socialapp.post.PostRepository;
import com.rafaelvincensi.socialapp.user.UserModel;
import com.rafaelvincensi.socialapp.user.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import javax.crypto.spec.PSource;
import java.util.List;

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
    public LikeModel curtirPost(Long userId, Long postId){
        if (likeRepository.existsByUserIdAndPostId(userId, postId)) {
            return null;
        }
        UserModel user = userRepository.findById(userId)
                .orElseThrow();
        PostModel post = postRepository.findById(postId)
                .orElseThrow();

        LikeModel like = new LikeModel();
        like.setUsers(user);
        like.setPost(post);

        LikeModel likeSalvo = likeRepository.save(like);
        post.setLikesCount(post.getLikesCount() + 1);
        postRepository.save(post);

        return likeSalvo;
    }

        @Transactional
        public void descurtirPost(Long userId, Long postId) {
            if (!likeRepository.existsByUserIdAndPostId(userId, postId)) {
                return;
            }
            likeRepository.deleteByUserIdAndPostId(userId, postId);
            PostModel post = postRepository.findById(postId)
                    .orElseThrow();
            post.setLikesCount(post.getLikesCount() - 1);
            postRepository.save(post);
        }

        public boolean usuarioCurtiuPost(Long userId, Long postId){
            return likeRepository.existsByUserIdAndPostId(userId, postId);
        }

        public List<UserModel> listarUserQueCurtiu(Long postId){
        List<LikeModel> like = likeRepository.findByPostId(postId);
        return like.stream()
                .map(LikeModel::getUsers)
                .toList();
    }

}
