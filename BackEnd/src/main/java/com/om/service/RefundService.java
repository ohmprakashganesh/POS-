package com.om.service;

import com.om.dto.RefundDto;
import com.om.modal.Refund;

import java.sql.Ref;
import java.time.LocalDateTime;
import java.util.List;

public interface RefundService {

    RefundDto createRefund(RefundDto refund);
    List<RefundDto> getAllRefunds();
    List<RefundDto> getRefundByCashier(Long cashierId);
     List<RefundDto> getRefundByShiftReport(Long shiftReportId);
    List<RefundDto> getRefundByCashierDateRange(Long cashierId, LocalDateTime start, LocalDateTime end);
    List<RefundDto> getRefundByBranch(Long branchId);

    RefundDto getRefundById(Long id);
}
