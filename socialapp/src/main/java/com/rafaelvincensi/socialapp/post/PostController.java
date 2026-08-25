package com.rafaelvincensi.socialapp.post;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/post")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/{id}")
    public PostModel getPostById(@PathVariable Long id){
        return postService.buscarPostId(id);
    }

    @PostMapping
    public ResponseEntity<Object> createPost(@RequestBody PostModel postModel){
        try {
            PostModel post = postService.criarPost(postModel);
            return ResponseEntity.ok(post);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Erro: " + e.getMessage());
        }
        }

    @GetMapping
    public List<PostModel> getAllPosts(){
        return postService.listarPosts();
    }

   @DeleteMapping("/{id}")
    public void deletePost(@PathVariable Long id){
        postService.deletePost(id);
   }

    @PutMapping("/update/{id}")
    public ResponseEntity<PostModel> updatePost(@PathVariable Long id,@RequestBody PostModel postModel){
        PostModel postAtualizado = postService.atualizarPost(id, postModel);
        return ResponseEntity.ok(postAtualizado);
    }
}
