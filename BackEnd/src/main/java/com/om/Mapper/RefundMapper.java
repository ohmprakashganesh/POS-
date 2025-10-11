package com.om.Mapper;

import com.om.dto.RefundDto;
import com.om.modal.Refund;

import java.sql.Ref;

public class RefundMapper {

    public  static RefundDto toDto(Refund refund){
        return RefundDto.builder()
                .id(refund.getId())
                .branchId(refund.getBranch().getId())
                .orderId(refund.getOrder().getId())
                .reason(refund.getReason())
                .amount(refund.getAmount())
                .cashierName(refund.getCashier().getName())
                .shiftReportId(refund.getShiftReport() !=null ? refund.getShiftReport().getId():null)
                .createdAt(refund.getCreatedAt())
                .build();
    }
}
