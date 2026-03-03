package com.xiwat.service;

import com.xiwat.model.AttackLog;
import com.xiwat.repository.AttackLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
public class AttackLogService {

    @Autowired
    private AttackLogRepository attackLogRepository;

    public void logAttack(String ip, String type, String payload) {
        AttackLog log = new AttackLog();
        log.setIpAddress(ip);
        log.setAttackType(type);
        log.setPayload(payload);
        log.setTimestamp(LocalDateTime.now());
        attackLogRepository.save(log);
    }
}
