package com.om.dto;

import com.om.modal.Branch;
import com.om.modal.Product;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class InventoryDto {

    private  Long id;

    private Long branchId;

    private Long productId;

    private  ProductDto product;

    private  Long quantity;

    private LocalDateTime lastUpdated;

}
