package com.om.dto;

import com.om.modal.Order;
import com.om.modal.Product;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderItemsDto {

    private  Long id;

    private  int quantity;

    private  Double price;

    private  Double sellingPrice;

    private ProductDto product;

    private  Long productId;


    private Long orderId;
}
