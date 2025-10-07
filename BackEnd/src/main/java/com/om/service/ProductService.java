package com.om.service;

import com.om.dto.ProductDto;
import com.om.modal.User;

import java.util.List;

public interface ProductService {

    ProductDto createProduct(ProductDto productDto, User user);
    ProductDto updateProduct(Long id, ProductDto productDto, User user);

    void deleteProduct(Long id, User user);

    List<ProductDto> getProductsByStoreId(Long storeId);
    List<ProductDto> searchByKeyword(Long storeId, String keyword);

}
