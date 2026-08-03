package com.rafaelvincensi.socialapp.post;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    private PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public PostModel criarPost(PostModel postModel){
        postModel.setCreatedAt(LocalDateTime.now());
        postModel.setLikesCount(0);
        return postRepository.save(postModel);
    }

    public List<PostModel> listarPosts(){
        return postRepository.findAllByOrderByCreatedAtDesc();
    }

   public PostModel buscarPostId(Long id){
        Optional<PostModel> postModel = postRepository.findById(id);
        return postModel.orElse(null);
   }

    public void deletePost(Long id){
        postRepository.deleteById(id);
    }

    public PostModel curtirPost(Long id){
        PostModel post = buscarPostId(id);
        if (post != null){
            post.setLikesCount(post.getLikesCount() + 1);
            return postRepository.save(post);
        }
        return null;
    }

}
