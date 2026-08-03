package com.rafaelvincensi.socialapp.music;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MusicRepository extends JpaRepository<MusicModel, Long> {
    List<MusicModel> findByArtistContainingIgnoreCase(String artist);
    List<MusicModel> findByTitleContainingIgnoreCase(String title);
}