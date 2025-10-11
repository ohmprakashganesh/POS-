package com.om.controller;
import com.om.dto.RefundDto;
import com.om.modal.Refund;
import com.om.service.RefundService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/refunds")
@RequiredArgsConstructor
public class RefundController {

    private final RefundService refundService;

    // 🔹 Create a new refund
    @PostMapping
    public ResponseEntity<RefundDto> createRefund(@RequestBody RefundDto refund) {
        RefundDto created = refundService.createRefund(refund);
        return ResponseEntity.ok(created);
    }

    // 🔹 Get all refunds
    @GetMapping
    public ResponseEntity<List<RefundDto>> getAllRefunds() {
        List<RefundDto> refunds = refundService.getAllRefunds();
        return ResponseEntity.ok(refunds);
    }

    // 🔹 Get refund by ID
    @GetMapping("/{id}")
    public ResponseEntity<RefundDto> getRefundById(@PathVariable Long id) {
        RefundDto refund = refundService.getRefundById(id);
        return ResponseEntity.ok(refund);
    }

    // 🔹 Get refunds by cashier
    @GetMapping("/cashier/{cashierId}")
    public ResponseEntity<List<RefundDto>> getRefundByCashier(@PathVariable Long cashierId) {
        List<RefundDto> refunds = refundService.getRefundByCashier(cashierId);
        return ResponseEntity.ok(refunds);
    }

    // 🔹 Get refunds by branch
    @GetMapping("/branch/{branchId}")
    public ResponseEntity<List<RefundDto>> getRefundByBranch(@PathVariable Long branchId) {
        List<RefundDto> refunds = refundService.getRefundByBranch(branchId);
        return ResponseEntity.ok(refunds);
    }

    // 🔹 Get refunds by shift report
    @GetMapping("/shift/{shiftReportId}")
    public ResponseEntity<List<RefundDto>> getRefundByShiftReport(@PathVariable Long shiftReportId) {
        List<RefundDto> refunds = refundService.getRefundByShiftReport(shiftReportId);
        return ResponseEntity.ok(refunds);
    }
    // 🔹 Get refunds by cashier within date range
    @GetMapping("/cashier/{cashierId}/range")
    public ResponseEntity<List<RefundDto>> getRefundByCashierDateRange(
            @PathVariable Long cashierId,
            @RequestParam("start") @DateTimeFormat (iso=DateTimeFormat.ISO.DATE_TIME) String start,
            @RequestParam("end") @DateTimeFormat (iso=DateTimeFormat.ISO.DATE_TIME) String end
    ) {
        LocalDateTime startDate = LocalDateTime.parse(start);
        LocalDateTime endDate = LocalDateTime.parse(end);
        List<RefundDto> refunds = refundService.getRefundByCashierDateRange(cashierId, startDate, endDate);
        return ResponseEntity.ok(refunds);
    }
}
