package com.om.controller;

import com.om.modal.OrderStatus;
import com.om.modal.PaymentType;
import com.om.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.om.dto.OrderDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    // Create Order
    @PostMapping
    public ResponseEntity<OrderDto> createOrder(@RequestBody OrderDto orderDto) {
        OrderDto createdOrder = orderService.createOrder(orderDto);
        return ResponseEntity.ok(createdOrder);
    }

    // Get Order by ID
    @GetMapping("/{id}")
    public ResponseEntity<OrderDto> getOrderById(@PathVariable Long id) {
        OrderDto order = orderService.getOrderById(id);
        return ResponseEntity.ok(order);
    }

    // Get Orders by Branch with filters
    @GetMapping("/branch/{branchId}")
    public ResponseEntity<List<OrderDto>> getOrdersByBranch(
            @PathVariable Long branchId,
            @RequestParam(required = false) Long cashierId,
            @RequestParam(required = false) Long customerId,
            @RequestParam(required = false) PaymentType paymentType,
            @RequestParam(required = false) OrderStatus status) {

        List<OrderDto> orders = orderService.getOrdersByBranch(branchId, cashierId, customerId, paymentType, status);
        return ResponseEntity.ok(orders);
    }

    // Get Orders by Cashier
    @GetMapping("/cashier/{cashierId}")
    public ResponseEntity<List<OrderDto>> getOrdersByCashier(@PathVariable Long cashierId) {
        List<OrderDto> orders = orderService.getOrderByCashier(cashierId);
        return ResponseEntity.ok(orders);
    }

    // Delete Order by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        orderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }

    // Get Today's Orders by Branch
    @GetMapping("/today/branch/{branchId}")
    public ResponseEntity<List<OrderDto>> getTodayOrdersByBranch(@PathVariable Long branchId) {
        List<OrderDto> orders = orderService.getTodayOrdersByBranch(branchId);
        return ResponseEntity.ok(orders);
    }

    // Get Orders by Customer
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<OrderDto>> getOrdersByCustomerId(@PathVariable Long customerId) {
        List<OrderDto> orders = orderService.getOrdersByCustomerId(customerId);
        return ResponseEntity.ok(orders);
    }

    // Get Top 5 Recent Orders by Branch
    @GetMapping("/recent/{branchId}")
    public ResponseEntity<List<OrderDto>> getTop5RecentOrdersByBranchId(@PathVariable Long branchId) {
        List<OrderDto> orders = orderService.getTop5RecentOrdersByBranchId(branchId);
        return ResponseEntity.ok(orders);
    }
}

