package com.om.repository;

import com.om.modal.ShiftReport;
import com.om.modal.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ShiftReportRepo extends JpaRepository<ShiftReport , Long> {

    List<ShiftReport> findByCashierId(Long id);
    List<ShiftReport> findByBranchId(Long id);

    Optional<ShiftReport> findTopByCashierAndShiftEndIsNullOrderByShiftStartDesc(
            User cashier
    );

    Optional<ShiftReport> findByCashierAndShiftStartBetween(
            User cashier,
            LocalDateTime start,
            LocalDateTime end);


}
