package com.rafaelvincensi.socialapp.music;

import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MusicService {

    private MusicRepository musicRepository;

    public MusicService(MusicRepository musicRepository) {
        this.musicRepository = musicRepository;
    }

    public MusicModel criarMusica(MusicModel musicModel){
        return musicRepository.save(musicModel);
    }

    public MusicModel listarMusicaPorId(Long id){
        Optional<MusicModel> musicPorId = musicRepository.findById(id);
        return musicPorId.orElse(null);
    }

}
