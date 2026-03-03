package com.xiwat.controller;

import com.xiwat.model.AttackLog;
import com.xiwat.repository.AttackLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AttackLogController {

    @Autowired
    private AttackLogRepository attackLogRepository;

    @GetMapping("/logs")
    public ResponseEntity<List<AttackLog>> getAllLogs() {
        return ResponseEntity.ok(attackLogRepository.findAll(Sort.by(Sort.Direction.DESC, "timestamp")));
    }
}
