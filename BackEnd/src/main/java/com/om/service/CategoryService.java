package com.om.service;

import com.om.dto.CateogryDto;

import java.util.List;

public interface CategoryService {
    CateogryDto createCategory(CateogryDto cateogryDto);
    List<CateogryDto> getCategoriesByStore(Long storeId);
    CateogryDto updateCategory(Long categoryId, CateogryDto cateogryDto);
    void  deleteCategory(Long id);
}
