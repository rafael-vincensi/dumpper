CREATE TABLE tb_music (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    artist VARCHAR(150) NOT NULL,
    album VARCHAR(150),
    cover_url TEXT,
    spotify_url TEXT
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    bio VARCHAR(255),
    profile_picture TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    current_song_title VARCHAR(150),
    current_song_artist VARCHAR(150),
    current_song_url TEXT,
    is_listening BOOLEAN DEFAULT FALSE,
    favorite_music_id BIGINT REFERENCES tb_music(id),
    followers INT DEFAULT 0,
    following INT DEFAULT 0
);

CREATE TABLE tb_post (
    id SERIAL PRIMARY KEY,
    content TEXT,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    likes_count INT DEFAULT 0,
    user_post BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE
);