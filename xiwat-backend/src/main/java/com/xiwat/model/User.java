package com.xiwat.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    @com.fasterxml.jackson.annotation.JsonIgnore
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(name = "failed_attempts")
    private Integer failedAttempts = 0;

    @Column(name = "lock_time")
    private LocalDateTime lockTime;

    public enum Role {
        USER, ADMIN
    }
}
