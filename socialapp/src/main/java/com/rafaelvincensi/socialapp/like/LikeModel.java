package com.rafaelvincensi.socialapp.like;

import com.rafaelvincensi.socialapp.post.PostModel;
import com.rafaelvincensi.socialapp.user.UserModel;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table (name = "likes", uniqueConstraints = {@UniqueConstraint(columnNames = {"user_id", "post_id"})})
@NoArgsConstructor
@AllArgsConstructor
@Data
public class LikeModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserModel users;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private PostModel post;

}
