package com.rafaelvincensi.socialapp.music;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/music")
public class MusicController {

    private MusicService musicService;

    public MusicController(MusicService musicService) {
        this.musicService = musicService;
    }

    @PostMapping
    public MusicModel criarMusica(@RequestBody MusicModel musicModel){
        return musicService.cadastrarMusica(musicModel);
    }

    @GetMapping("/{id}")
    public MusicModel listarMusicaPorId(@PathVariable Long id){
        return musicService.listarMusicaPorId(id);
    }

    @GetMapping
    public List<MusicModel> listarMusicas(){
        return musicService.listarMusicas();
    }

    @GetMapping("title/{title}")
    public List<MusicModel> findByTitleContainingIgnoreCase(@PathVariable String title){
        return musicService.findByTitleContainingIgnoreCase(title);
    }

    @GetMapping("/artist/{artist}")
    public List<MusicModel> findByArtistContainingIgnoreCase(@PathVariable String artist){
        return musicService.findByArtistContainingIgnoreCase(artist);
    }

    @DeleteMapping("/{id}")
    public void deleteMusic(@PathVariable Long id){
        musicService.deleteMusic(id);
    }

}
