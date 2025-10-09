package com.om.dto;

import com.om.modal.*;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderDto {

    private Long id;

    private  double totalAmount;

    private LocalDateTime createdAt;

    private PaymentType paymentType;

    private BranchDto branch;

    private  Long branchId;

    private UserDto cashier;

    private Customer customer;

    private List<OrderItemsDto> items;

}
