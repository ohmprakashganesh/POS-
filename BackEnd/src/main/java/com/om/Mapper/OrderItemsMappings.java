package com.om.Mapper;

import com.om.dto.OrderItemsDto;
import com.om.dto.ProductDto;
import com.om.modal.OrderItems;

public class OrderItemsMappings {

    public  static OrderItemsDto toDto(OrderItems orderItems){
        if(orderItems==null) return  null;

        OrderItemsDto dto= new OrderItemsDto();
        dto.setId(orderItems.getId());
        dto.setProductId(orderItems.getProduct().getId());
        dto.setOrderId(orderItems.getProduct().getId());
        dto.setProduct(ProductMappings.productToDto(orderItems.getProduct()));
        dto.setPrice(orderItems.getPrice());
        dto.setQuantity(orderItems.getQuantity());
        dto.setSellingPrice(orderItems.getSellingPrice());

        return  dto;

    }
}
