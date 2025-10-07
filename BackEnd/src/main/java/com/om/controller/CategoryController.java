package com.om.controller;



import com.om.dto.CateogryDto;
import com.om.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/category")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    /**
     * Create a new category
     */
    @PostMapping("/create")
    public ResponseEntity<CateogryDto> createCategory(@RequestBody CateogryDto cateogryDto) {
        CateogryDto created = categoryService.createCategory(cateogryDto);
        return ResponseEntity.ok(created);
    }

    /**
     * Get all categories belonging to a specific store
     */
    @GetMapping("/store/{storeId}")
    public ResponseEntity<List<CateogryDto>> getCategoriesByStore(@PathVariable Long storeId) {
        List<CateogryDto> categories = categoryService.getCategoriesByStore(storeId);
        return ResponseEntity.ok(categories);
    }

    /**
     * Update a category by ID
     */
    @PutMapping("/{categoryId}")
    public ResponseEntity<CateogryDto> updateCategory(@PathVariable Long categoryId, @RequestBody CateogryDto cateogryDto) {
        CateogryDto updated = categoryService.updateCategory(categoryId, cateogryDto);
        return ResponseEntity.ok(updated);
    }

    /**
     * Delete a category by ID
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.ok("Category deleted successfully.");
    }
}
