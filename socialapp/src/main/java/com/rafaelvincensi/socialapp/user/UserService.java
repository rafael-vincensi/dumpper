package com.rafaelvincensi.socialapp.user;

import org.apache.catalina.User;
import org.springframework.stereotype.Service;

import java.util.List;
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

            if (userModelUpdate.getUsername() != null && !userModelUpdate.getUsername().isEmpty()) {
                if (!userModelUpdate.getUsername().equals(user.getUsername())) {
                    UserModel existingUser = userRepository.findByUsername(userModelUpdate.getUsername());
                    if (existingUser != null){
                        throw new RuntimeException("Username ja existe!");
                    }
                    user.setUsername(userModelUpdate.getUsername());
                }
            }
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

    public UserModel loginUser(LoginDTO dto) {
        UserModel user = userRepository.findByEmail(dto.email());

        if (user != null) {
            if (dto.password().equals(user.getPassword())) {
                return user;
            }
        }
        return null;
    }

    public List<UserModel> searchBar(String query){
        List<UserModel> userList = userRepository.findByUsernameContainingIgnoreCaseOrNameContainingIgnoreCase(query, query);
        return userList;
    }

}
