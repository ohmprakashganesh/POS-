package com.om.dto;

import com.om.modal.PaymentType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RefundDto {

    private Long id;

    private String reason;

    private Double amount;

    private Long shiftReportId;

    private OrderDto orderDto;

    private Long orderId;

    private UserDto cashier;

    private  String cashierName;

    private BranchDto branch;
    private Long cashierId;     // reference to User
    private Long branchId;      // reference to Branch

    private PaymentType paymentType;

    private LocalDateTime createdAt;


}
