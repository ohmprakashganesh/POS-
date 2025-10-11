package com.om.service;

import com.om.dto.ShiftReportDto;
import com.om.modal.ShiftReport;

import java.time.LocalDateTime;
import java.util.List;

public interface ShirtReportServices {

    ShiftReportDto startShirt();
    ShiftReportDto endShift(Long ShiftReportId, LocalDateTime shiftEnd  );
    ShiftReportDto getShiftReportById(Long id);
    List<ShiftReportDto> getAllShiftReports();

    List<ShiftReportDto> getShiftReportsByBranchId(Long branchId);
    List<ShiftReportDto> getShiftReportsByCashierId(Long cashierId);

    ShiftReportDto getCurrentShiftProgress(Long cashierId);

    ShiftReportDto  getShiftByCashierAndDate(Long cashierId, LocalDateTime date);

}
