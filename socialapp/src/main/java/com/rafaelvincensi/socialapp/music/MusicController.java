package com.rafaelvincensi.socialapp.music;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/musics")
public class MusicController {

    private MusicService musicService;

    public MusicController(MusicService musicService) {
        this.musicService = musicService;
    }

    @PostMapping
    public MusicModel criarMusica(@RequestBody MusicModel musicModel){
        return musicService.criarMusica(musicModel);
    }

    @GetMapping("{id}")
    public MusicModel listarMusicaPorId(@PathVariable Long id){
        return musicService.listarMusicaPorId(id);
    }

}
