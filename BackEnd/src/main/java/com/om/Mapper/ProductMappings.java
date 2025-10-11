package com.om.Mapper;

import com.om.dto.ProductDto;
import com.om.modal.Category;
import com.om.modal.Product;
import com.om.modal.Store;

public class ProductMappings {

    // DTO → Entity
    public static Product toEntity(ProductDto dto, Store store, Category category) {
        if (dto == null) return null;

        Product product = new Product();
        product.setId(dto.getId());
        product.setCategory(category);
        product.setName(dto.getName());
        product.setSku(dto.getSku());
        product.setDescription(dto.getDescription());
        product.setMrp(dto.getMrp());
        product.setSellingPrice(dto.getSellingPrice());
        product.setStore(store);
        product.setBrand(dto.getBrand());
        product.setImage(dto.getImage());
        product.setCreatedAt(dto.getCreatedAt());
        product.setUpdatedAt(dto.getUpdatedAt());
        return product;
    }

    // Entity → DTO
    public static ProductDto productToDto(Product product) {
        if (product == null) return null;

        ProductDto dto = new ProductDto();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setSku(product.getSku());
        dto.setDescription(product.getDescription());
        dto.setMrp(product.getMrp());
        dto.setBrand(product.getBrand());
        dto.setImage(product.getImage());
        dto.setCategoryId(product.getId());
        dto.setStoreId(product.getStore() !=null ?product.getId():null);
        dto.setCateogryDto(CategoryMappings.categoryToDto(product.getCategory()));
        dto.setCreatedAt(product.getCreatedAt());
        dto.setUpdatedAt(product.getUpdatedAt());
        dto.setSellingPrice(product.getSellingPrice());
        return dto;
    }

    public static Product ProductUpdateToEntity(ProductDto dto, Product product) {
        if (dto == null) return null;
        product.setName(dto.getName());
        product.setSku(dto.getSku());
        product.setDescription(dto.getDescription());
        product.setMrp(dto.getMrp());
        product.setBrand(dto.getBrand());
        product.setImage(dto.getImage());
        product.setUpdatedAt(dto.getUpdatedAt());
        product.setSellingPrice(dto.getSellingPrice());
        return product;
    }


}
