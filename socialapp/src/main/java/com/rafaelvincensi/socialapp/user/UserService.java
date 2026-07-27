package com.rafaelvincensi.socialapp.user;

import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {

    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserModel criarUser(UserModel userModel){
        return userRepository.save(userModel);
    }

    public UserModel atualizarUser(Long id, UserModel userModelAtualizado){
            if(userRepository.existsById(id)){
                userModelAtualizado.setId(id);
                return userRepository.save(userModelAtualizado);
            }
            return null; // null por enquanto
    }

    public UserModel listarUserPorId(Long id){
        Optional<UserModel> userPorId =userRepository.findById(id);
        return userPorId.orElse(null);
    }


    public void deleteUser(Long id){
        userRepository.deleteById(id);
    }

}
