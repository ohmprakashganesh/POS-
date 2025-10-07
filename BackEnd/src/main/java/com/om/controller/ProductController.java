package com.om.controller;


import com.om.dto.ProductDto;
import com.om.modal.User;
import com.om.service.ProductService;
import com.om.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;
    private final UserService userService;

    /**
     * Create a new product
     */
    @PostMapping("/create")
    public ResponseEntity<ProductDto> createProduct(@RequestBody ProductDto productDto,@RequestHeader("Authorization") String jwt) {
         User user= userService.getUserFromJwtToken(jwt);
        ProductDto created = productService.createProduct(productDto,user);
        return ResponseEntity.ok(created);
    }

    /**
     * Get all products of a store
     */
    @GetMapping("/store/{storeId}")
    public ResponseEntity<List<ProductDto>> getProductsByStore(@PathVariable Long storeId) {
        List<ProductDto> products = productService.getProductsByStoreId(storeId);
        return ResponseEntity.ok(products);
    }


    /**
     * Search products by keyword for a store
     */
    @GetMapping("/store/{storeId}/search")
    public ResponseEntity<List<ProductDto>> searchByKeyword(
            @PathVariable Long storeId,
            @RequestParam("keyword") String keyword
    ) {
        List<ProductDto> results = productService.searchByKeyword(storeId, keyword);
        return ResponseEntity.ok(results);
    }

    /**
     * Update an existing product
     */
    @PutMapping("/update/{id}")
    public ResponseEntity<ProductDto> updateProduct(@PathVariable Long id, @RequestBody ProductDto productDto, @RequestHeader("Authorization") String jwt) {
        User user= userService.getUserFromJwtToken(jwt);
        ProductDto updated = productService.updateProduct(id, productDto, user);
        return ResponseEntity.ok(updated);
    }

    /**
     * Delete a product by ID
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id,@RequestHeader("Authorization") String jwt) {
        User user= userService.getUserFromJwtToken(jwt);
        productService.deleteProduct(id, user);
        return ResponseEntity.ok("Product deleted successfully.");
    }



}
