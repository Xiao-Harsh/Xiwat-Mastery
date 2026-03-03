package com.xiwat.repository;

import com.xiwat.model.AttackLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttackLogRepository extends JpaRepository<AttackLog, Long> {
}
