package com.rafaelvincensi.socialapp.user;

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


    public UserModel updateUser(Long id, UserModel userModelUpdate){
        Optional<UserModel> userOpt = userRepository.findById(id);

        if (userOpt.isPresent()){
            UserModel user = userOpt.get();

            if (userModelUpdate.getName() != null) user.setName(userModelUpdate.getName());
            if (userModelUpdate.getBio() != null) user.setBio(userModelUpdate.getBio());
            if (userModelUpdate.getProfilePicture() != null) user.setProfilePicture(userModelUpdate.getProfilePicture());

            return userRepository.save(user);
        }
        return null;
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

    public UserModel registerUser(RegisterDTO dto){
        UserModel user = new UserModel();

        user.setName(dto.name());
        user.setUsername(dto.username());
        user.setEmail(dto.email());
        user.setPassword(dto.password());

        return userRepository.save(user);
    }

    public UserModel loginUser(String email, String password) {
        UserModel user = userRepository.findByEmail(email);

        if (user != null) {
            if (password.equals(user.getPassword())) {
                return user;
            }
        }
        return null;
    }



}
