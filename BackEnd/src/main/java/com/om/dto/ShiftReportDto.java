package com.om.dto;

import com.om.modal.*;
import jakarta.persistence.CascadeType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ShiftReportDto {



    private  Long id;

    private LocalDateTime shiftStart;
    private  LocalDateTime shiftEnd;

    private Double totalSales;
    private  Double totalRefunds;
    private Double netSale;
    private  int totalOrders;


    private UserDto cashier;
    private Long cashierId;


    private BranchDto branch;
    private Long branchId;



    private List<PaymentSummery> paymentSummeries;


    private  List<ProductDto> topSellingProducts;


    private List<OrderDto> recentOrders;

    private  List<RefundDto> refund;


}
