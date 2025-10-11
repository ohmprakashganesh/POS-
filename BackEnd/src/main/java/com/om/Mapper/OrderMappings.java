package com.om.Mapper;

import com.om.dto.OrderDto;
import com.om.dto.OrderItemsDto;
import com.om.modal.Order;

import java.util.stream.Collectors;

public class OrderMappings {

    public  static  OrderDto toDto(Order order){
       OrderDto orderDto= new OrderDto();
        orderDto.setId(order.getId());
        orderDto.setTotalAmount(order.getTotalAmount());
        orderDto.setBranchId(order.getBranch().getId());
        orderDto.setCashier(Mappings.userToDto(order.getCashier()));
        orderDto.setCustomer(order.getCustomer());
        orderDto.setPaymentType(order.getPaymentType());
        orderDto.setCreatedAt(order.getCreatedAt());
        orderDto.setItems(order.getItems().stream().map(OrderItemsMappings::toDto).collect(Collectors.toList()));
    return  orderDto;
     }
}
