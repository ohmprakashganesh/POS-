package com.om.controller;


import com.om.dto.ShiftReportDto;
import com.om.service.ShirtReportServices;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/shift")
@RequiredArgsConstructor
public class ShiftReportController {

    private  final ShirtReportServices shiftReportService;


    @PostMapping("/start")
    public ResponseEntity<ShiftReportDto> startShift() {
        ShiftReportDto createdShift = shiftReportService.startShirt();
        return new ResponseEntity<>(createdShift, HttpStatus.CREATED);
    }
    // ✅ End a shift
    @PutMapping("/end")
    public ResponseEntity<ShiftReportDto> endShift(
//            @PathVariable Long shiftReportId,
//            @RequestParam LocalDateTime shiftEnd
    ) {
        ShiftReportDto endedShift = shiftReportService.endShift(null, null);
        return ResponseEntity.ok(endedShift);
    }

    // ✅ Get shift by ID
    @GetMapping("/{id}")
    public ResponseEntity<ShiftReportDto> getShiftReportById(@PathVariable Long id) {
        ShiftReportDto shift = shiftReportService.getShiftReportById(id);
        return ResponseEntity.ok(shift);
    }

    // ✅ Get all shift reports
    @GetMapping("/all")
    public ResponseEntity<List<ShiftReportDto>> getAllShiftReports() {
        List<ShiftReportDto> shifts = shiftReportService.getAllShiftReports();
        return ResponseEntity.ok(shifts);
    }

    // ✅ Get shift reports by branch
    @GetMapping("/branch/{branchId}")
    public ResponseEntity<List<ShiftReportDto>> getShiftReportsByBranch(@PathVariable Long branchId) {
        List<ShiftReportDto> shifts = shiftReportService.getShiftReportsByBranchId(branchId);
        return ResponseEntity.ok(shifts);
    }

    // ✅ Get shift reports by cashier
    @GetMapping("/cashier/{cashierId}")
    public ResponseEntity<List<ShiftReportDto>> getShiftReportsByCashier(@PathVariable Long cashierId) {
        List<ShiftReportDto> shifts = shiftReportService.getShiftReportsByCashierId(cashierId);
        return ResponseEntity.ok(shifts);
    }

    // ✅ Get current shift progress for a cashier
    @GetMapping("/cashier/{cashierId}/current")
    public ResponseEntity<ShiftReportDto> getCurrentShiftProgress(@PathVariable Long cashierId) {
        ShiftReportDto shift = shiftReportService.getCurrentShiftProgress(cashierId);
        return ResponseEntity.ok(shift);
    }

    // ✅ Get shift by cashier and date
    @GetMapping("/cashier/{cashierId}/date")
    public ResponseEntity<?> getShiftByCashierAndDate(
            @PathVariable Long cashierId,
            @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date
    ) {
        ShiftReportDto shift = shiftReportService.getShiftByCashierAndDate(cashierId, date.atStartOfDay());
        if (shift == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "No shift found for cashier ID " + cashierId + " on " + date));
        }
        return ResponseEntity.ok(shift);
    }


}
