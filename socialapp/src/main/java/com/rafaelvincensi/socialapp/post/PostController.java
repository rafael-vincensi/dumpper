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
    public PostModel buscarPostId(@PathVariable Long id){
        return postService.buscarPostId(id);
    }

    @PostMapping
    public PostModel criarPost(@RequestBody PostModel postModel){
        return postService.criarPost(postModel);
    }

    @GetMapping
    public List<PostModel> listarPost(){
        return postService.listarPosts();
    }

   @DeleteMapping("/{id}")
    public void deletePost(@PathVariable Long id){
        postService.deletePost(id);
   }

    @PutMapping("/update/{id}")
    public ResponseEntity<PostModel> atualizarPost(@PathVariable Long id,@RequestBody PostModel postModel){
        PostModel postAtualizado = postService.atualizarPost(id, postModel);
        return ResponseEntity.ok().build();
    }


}
