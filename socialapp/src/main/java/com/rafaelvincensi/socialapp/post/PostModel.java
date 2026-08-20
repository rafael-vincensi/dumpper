package com.rafaelvincensi.socialapp.post;

import com.rafaelvincensi.socialapp.user.UserModel;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "tb_post")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class PostModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String content;

    @Column(name = "image_url", columnDefinition = "TEXT")
    private String imageUrl;
    private LocalDateTime createdAt;
    private Integer likesCount;

    @ManyToOne
    @JoinColumn(name = "user_post")
    private UserModel user;

}
