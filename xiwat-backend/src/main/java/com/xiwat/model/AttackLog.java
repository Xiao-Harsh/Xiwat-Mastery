package com.xiwat.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "attack_logs", indexes = { @Index(columnList = "ip_address") })
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AttackLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ip_address")
    private String ipAddress;

    @Column(name = "attack_type")
    private String attackType;

    @Column(columnDefinition = "TEXT")
    private String payload;

    @Column(nullable = false, updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime timestamp;

    @PrePersist
    protected void onCreate() {
        if (timestamp == null) {
            timestamp = LocalDateTime.now();
        }
    }
}
