package com.rafaelvincensi.socialapp.music;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class MusicService {

    private final MusicRepository musicRepository;

    public MusicService(MusicRepository musicRepository) {
        this.musicRepository = musicRepository;
    }

    public MusicModel cadastrarMusica(MusicModel musicModel){
        return musicRepository.save(musicModel);
    }

    public List<MusicModel> listarMusicas(){
        List<MusicModel> musicModel = musicRepository.findAll();
        return musicModel;
    }

    public MusicModel listarMusicaPorId(Long id){
        Optional<MusicModel> musicPorId = musicRepository.findById(id);
        return musicPorId.orElse(null);
    }

    public List<MusicModel> findByTitleContainingIgnoreCase(String title) {
        return musicRepository.findByTitleContainingIgnoreCase(title);
    }

    public List<MusicModel> findByArtistContainingIgnoreCase (String artist){
        return musicRepository.findByArtistContainingIgnoreCase(artist);
    }

    public void deleteMusic(Long id){
        musicRepository.deleteById(id);
    }
}

