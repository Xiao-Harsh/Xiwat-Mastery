package com.xiwat.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class HealthController {

    @GetMapping("/health")
    public java.util.Map<String, String> healthCheck() {
        return java.util.Map.of(
                "status", "UP",
                "environment", "DEVELOPMENT");
    }
}
