package com.rafaelvincensi.socialapp.user;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table (name = "users")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @Column (unique = true)
    private String username;

    @Column (unique = true)
    private String email;
    private String password;
    private String bio;

    @Column(name = "profile_picture")
    private String profilePicture;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

}
