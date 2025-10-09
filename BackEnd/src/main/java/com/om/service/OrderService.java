package com.om.service;

import com.om.dto.OrderDto;
import com.om.modal.OrderStatus;
import com.om.modal.PaymentType;

import java.util.List;

public interface OrderService {

    OrderDto createOrder(OrderDto orderDto);
    OrderDto getOrderById(Long id);
    List<OrderDto> getOrdersByBranch(
            Long branchId,
            Long cashierId,
            Long customerId,
            PaymentType paymentType,
            OrderStatus status);
    List<OrderDto> getOrderByCashier(long cashierId);
    void deleteOrder(Long id);
    List<OrderDto> getTodayOrdersByBranch(Long branchId);
    List<OrderDto> getOrdersByCustomerId(Long customerId);
    List<OrderDto> getTop5RecentOrdersByBranchId(Long branchId);



}
