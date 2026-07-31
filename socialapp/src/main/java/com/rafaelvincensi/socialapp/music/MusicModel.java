package com.rafaelvincensi.socialapp.music;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table (name = "tb_music")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MusicModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String artist;
    private String album;
    @Column(name = "cover_url")
    private String coverUrl;

    @Column(name = "spotify_url")
    private String spotifyUrl;


}
