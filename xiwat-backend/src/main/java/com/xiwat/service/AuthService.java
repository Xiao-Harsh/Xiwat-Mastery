package com.xiwat.service;

import com.xiwat.model.User;
import com.xiwat.repository.UserRepository;
import com.xiwat.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final AttackLogService attackLogService;

    private static final int MAX_FAILED_ATTEMPTS = 5;
    private static final int LOCK_TIME_MINUTES = 15;

    public void register(User user) {
        if (repository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(User.Role.USER);
        user.setFailedAttempts(0);
        repository.save(user);
    }

    public com.xiwat.dto.AuthResponse login(String email, String password) {
        User user = repository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (isAccountLocked(user)) {
            attackLogService.logAttack("SYSTEM", "ACCOUNT_LOCKOUT_ATTEMPT", "Locked user attempt: " + email);
            throw new LockedException("Account is locked. Try again in 15 minutes.");
        }

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password));
            resetFailedAttempts(user);

            var userDetails = org.springframework.security.core.userdetails.User.builder()
                    .username(user.getEmail())
                    .password(user.getPassword())
                    .roles(user.getRole().name())
                    .build();

            String token = jwtService.generateToken(Map.of("name", user.getName()), userDetails);

            return com.xiwat.dto.AuthResponse.builder()
                    .token(token)
                    .email(user.getEmail())
                    .name(user.getName())
                    .build();
        } catch (Exception e) {
            increaseFailedAttempts(user);
            throw new RuntimeException("Invalid credentials");
        }
    }

    private boolean isAccountLocked(User user) {
        if (user.getLockTime() == null)
            return false;
        if (user.getLockTime().plusMinutes(LOCK_TIME_MINUTES).isBefore(LocalDateTime.now())) {
            user.setLockTime(null);
            user.setFailedAttempts(0);
            repository.save(user);
            return false;
        }
        return true;
    }

    private void increaseFailedAttempts(User user) {
        int newAttempts = user.getFailedAttempts() + 1;
        user.setFailedAttempts(newAttempts);
        if (newAttempts >= MAX_FAILED_ATTEMPTS) {
            user.setLockTime(LocalDateTime.now());
            attackLogService.logAttack("SYSTEM", "ACCOUNT_LOCKOUT_TRIGGERED", "User locked: " + user.getEmail());
        }
        repository.save(user);
    }

    private void resetFailedAttempts(User user) {
        user.setFailedAttempts(0);
        user.setLockTime(null);
        repository.save(user);
    }
}
