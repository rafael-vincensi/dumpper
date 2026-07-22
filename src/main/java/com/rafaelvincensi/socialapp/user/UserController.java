package com.rafaelvincensi.socialapp.user;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("users")
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public UserModel criarUser(@RequestBody UserModel userModel){
        return userService.criarUser(userModel);
    }

    @GetMapping("/{id}")
    public UserModel listarUserPorId(@PathVariable Long id){
        return userService.listarUserPorId(id);
    }

    @PutMapping("/{id}")
    public UserModel atualizarUser(@PathVariable Long id, @RequestBody UserModel userModelAtualizado){
        return userService.atualizarUser(id, userModelAtualizado);
    }


    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id){
        userService.deleteUser(id);
    }


}
