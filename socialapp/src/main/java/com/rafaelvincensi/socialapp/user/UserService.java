package com.rafaelvincensi.socialapp.user;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

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
        Optional<UserModel> userPorId = userRepository.findById(id);
        return userPorId.orElse(null);
    }


    public void deleteUser(Long id){
        userRepository.deleteById(id);
    }

    public UserModel getUserProfile(String username){
        return userRepository.findByUsername(username);
    }

    public UserModel updateListeningStatus(Long id, boolean isListening, String currentSongTitle, String currentSongArtist, String currentSongUrl) {
       Optional<UserModel> userModel = userRepository.findById(id);

       if (userModel.isPresent()){
        UserModel user = userModel.get();

           user.setIsListening(isListening);
           user.setCurrentSongTitle(currentSongTitle);
           user.setCurrentSongArtist(currentSongArtist);
           user.setCurrentSongUrl(currentSongUrl);
           return userRepository.save(user);
       }
    return null;
    }
}
