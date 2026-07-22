package com.rafaelvincensi.socialapp.music;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MusicRepository extends JpaRepository<MusicModel, Long> {
}
