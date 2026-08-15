package com.rafaelvincensi.socialapp.follow;

import com.rafaelvincensi.socialapp.user.UserModel;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "follows")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FollowModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "follower_id")
    private UserModel follower;

    @ManyToOne
    @JoinColumn (name = "following_id")
    private UserModel following;
    private LocalDateTime createdAt;

    public FollowModel(UserModel follower, UserModel following) {
        this.follower = follower;
        this.following = following;
        this.createdAt = LocalDateTime.now();
    }

}
