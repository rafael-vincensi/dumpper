package com.rafaelvincensi.socialapp.user;

public record RegisterDTO(
        String name,
        String username,
        String email,
        String password
){}
