package com.rafaelvincensi.socialapp.user;

import jakarta.servlet.ServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/users")
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<UserModel> User(@RequestBody UserModel userModel){
        UserModel user = userService.criarUser(userModel);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserModel> listarUserPorId(@PathVariable Long id){
        UserModel userModel = userService.listarUserPorId(id);
        return ResponseEntity.ok(userModel);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserModel> atualizarUser(@PathVariable Long id, @RequestBody UserModel userModelAtualizado){
        UserModel userModel = userService.atualizarUser(id, userModelAtualizado);
        return ResponseEntity.ok(userModel);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id, ServletRequest servletRequest){
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/username/{username}")
    public ResponseEntity<UserModel> getUserProfile(@PathVariable String username){
        UserModel userModel = userService.getUserProfile(username);
        if (userModel != null) {
            return ResponseEntity.ok(userModel);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{id}/listening")
    public ResponseEntity<UserModel> updateListeningStatus(@PathVariable Long id, @RequestParam boolean isListening, @RequestParam String currentSongTitle, @RequestParam String currentSongArtist, @RequestParam String currentSongUrl){
        UserModel userModel = userService.updateListeningStatus(id, isListening, currentSongTitle, currentSongArtist, currentSongUrl);
        if (userModel != null)
        {
            return ResponseEntity.ok(userModel);
        } else {
            return ResponseEntity.notFound().build();
        }
}
}
