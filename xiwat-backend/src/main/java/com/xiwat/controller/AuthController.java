package com.xiwat.controller;

import com.xiwat.dto.AuthRequest;
import com.xiwat.dto.AuthResponse;
import com.xiwat.model.User;
import com.xiwat.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        authService.register(user);
        return ResponseEntity.ok(Map.of("message", "Registration successful"));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        String token = authService.login(request.getEmail(), request.getPassword());

        // Fetch user again for response metadata or pass it through service
        // For simplicity, returning basic info with token
        return ResponseEntity.ok(AuthResponse.builder()
                .token(token)
                .email(request.getEmail())
                .name("User") // Placeholder, real name can be added to JWT or fetched
                .build());
    }
}
