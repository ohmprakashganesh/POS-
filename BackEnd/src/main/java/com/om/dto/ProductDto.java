package com.om.dto;

import com.om.modal.Store;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDto {

        private  Long id;

        private String name;

        private String sku;

        private  String description;

        private  Double mrp;

        private  double sellingPrice;

        private String brand;

        private  CateogryDto cateogryDto;

        private  String image;

        private Long storeId;

        private  Long CategoryId;

        private LocalDateTime createdAt;

        private  LocalDateTime updatedAt;







}
