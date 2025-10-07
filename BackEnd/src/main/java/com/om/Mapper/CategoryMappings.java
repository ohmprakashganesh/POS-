package com.om.Mapper;

import com.om.dto.CateogryDto;
import com.om.modal.Category;
import com.om.modal.Store;

public class CategoryMappings {

    public  static Category dtoToCategory(CateogryDto cateogryDto, Store store){
        Category category= new Category();
        category.setName(cateogryDto.getName());
        category.setStore(store);
        return  category;
    }

    public  static CateogryDto categoryToDto(Category category){
        CateogryDto cateogryDto= new CateogryDto();
        cateogryDto.setId(category.getId());
        cateogryDto.setName(category.getName());
        cateogryDto.setStoreId(category.getStore().getId());
        return  cateogryDto;
    }
}
