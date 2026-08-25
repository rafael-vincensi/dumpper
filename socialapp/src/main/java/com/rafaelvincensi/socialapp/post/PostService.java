package com.rafaelvincensi.socialapp.post;

import com.rafaelvincensi.socialapp.user.UserModel;
import com.rafaelvincensi.socialapp.user.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    private PostRepository postRepository;
    private UserRepository userRepository;

    public PostService(PostRepository postRepository, UserRepository userRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    public PostModel criarPost(PostModel postModel){

        if (postModel.getUser() == null || postModel.getUser().getId() == null){
            throw new RuntimeException("Post need some User to exist...");
        }

        Long userId = postModel.getUser().getId();

        UserModel user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found! ID: " + userId));

        postModel.setUser(user);
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

    public PostModel atualizarPost(Long id, PostModel postAtualizado){
        PostModel post = buscarPostId(id);

        if(post != null){
            postAtualizado.setId(id);
            return postRepository.save(postAtualizado);
        }
        return null;
    }


}
