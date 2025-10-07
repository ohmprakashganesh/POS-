package com.om.serviceImpl;

import com.om.Mapper.ProductMappings;
import com.om.dto.ProductDto;
import com.om.exception.UserNotFountException;
import com.om.modal.Category;
import com.om.modal.Product;
import com.om.modal.Store;
import com.om.modal.User;
import com.om.repository.CategoryRepo;
import com.om.repository.ProductRepo;
import com.om.repository.StoreRepo;
import com.om.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private  final StoreRepo storeRepo;
    private  final ProductRepo productRepo;
    private  final CategoryRepo categoryRepo;


    @Override
    public ProductDto createProduct(ProductDto productDto, User user) {
        Store store = storeRepo.findById(productDto.getStoreId()).orElseThrow(()-> new UserNotFountException("not found store"));
        Category category = categoryRepo.findById(productDto.getCategoryId()).orElseThrow(()-> new UserNotFountException("not found store"));

        Product product= ProductMappings.toEntity(productDto,store,category);
        Product saved=  productRepo.save(product);
        return  ProductMappings.productToDto(saved);
    }

    @Override
    public ProductDto updateProduct(Long id, ProductDto productDto, User user) {
        Category category=null;
        if(productDto.getCategoryId()!=null){
             category = categoryRepo.findById(productDto.getCategoryId()).orElseThrow(()-> new UserNotFountException("not found store"));
        }
        Product product= productRepo.findById(id).orElseThrow(()-> new RuntimeException("product not found with the id"));
        Product updated= ProductMappings.ProductUpdateToEntity(productDto, product);
        updated.setCategory(category);
        return ProductMappings.productToDto(productRepo.save(updated));
    }

    @Override
    public void deleteProduct(Long id, User user) {
        Product product= productRepo.findById(id).orElseThrow(()-> new RuntimeException("not found product with that id"));
        productRepo.deleteById(id);
    }

    @Override
    public List<ProductDto> getProductsByStoreId(Long storeId) {
       List<Product> lists= productRepo.findAll();
       return lists.stream().map(ProductMappings::productToDto).collect(Collectors.toList());
    }

    @Override
    public List<ProductDto> searchByKeyword(Long storeId, String keyword) {
      List<Product> lists= productRepo.searchByKeyword(storeId, keyword);
       return  lists.stream().map(ProductMappings::productToDto).collect(Collectors.toList());
    }
}
