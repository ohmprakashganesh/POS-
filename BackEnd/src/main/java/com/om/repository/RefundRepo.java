package com.om.repository;

import com.om.modal.Refund;
import com.om.modal.User;
import org.apache.tomcat.util.http.fileupload.util.LimitedInputStream;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Ref;
import java.time.LocalDateTime;
import java.util.List;

public interface RefundRepo extends JpaRepository<Refund, Long> {

    List<Refund> findByCashierIdAndCreatedAtBetween(Long cashierId, LocalDateTime from,LocalDateTime to);

    List<Refund> findByCashierId(Long id);
    List<Refund> findByShiftReportId(Long id);
    List<Refund> findByBranchId(Long id);
}
