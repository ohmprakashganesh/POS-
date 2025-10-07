package com.om.serviceImpl;

import com.om.Mapper.CategoryMappings;
import com.om.dto.CateogryDto;
import com.om.exception.UserNotFountException;
import com.om.modal.Category;
import com.om.modal.Role;
import com.om.modal.Store;
import com.om.modal.User;
import com.om.repository.CategoryRepo;
import com.om.repository.StoreRepo;
import com.om.service.CategoryService;
import com.om.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private  final CategoryRepo categoryRepo;
    private  final UserService userService;
    private  final StoreRepo storeRepo;

    @Override
    public CateogryDto createCategory(CateogryDto cateogryDto) {
        User user = userService.getCurrentUser();
        Store store = storeRepo.findById(cateogryDto.getStoreId()).orElseThrow(()-> new UserNotFountException("not found store"));
         checkAuthority(user,store);
         Category category= categoryRepo.save(CategoryMappings.dtoToCategory(cateogryDto,store));
         return  CategoryMappings.categoryToDto(category);
    }

    @Override
    public List<CateogryDto> getCategoriesByStore(Long storeId) {
        List<Category> lists= categoryRepo.findByStoreId(storeId);
        return  lists.stream().map(CategoryMappings::categoryToDto).collect(Collectors.toList());
    }

    @Override
    public CateogryDto updateCategory(Long categoryId, CateogryDto cateogryDto) {

        User user=userService.getCurrentUser();
        Category category= categoryRepo.findById(categoryId).orElseThrow(()-> new RuntimeException("category not found with id "+categoryId));

        category.setName(cateogryDto.getName());
        checkAuthority(user,category.getStore());
       return CategoryMappings.categoryToDto(categoryRepo.save(category));

    }

    @Override
    public void deleteCategory(Long id) {
        User user=userService.getCurrentUser();
        Category category= categoryRepo.findById(id).orElseThrow(()-> new RuntimeException("category not found with the id"+id));
        checkAuthority(user,category.getStore());
         categoryRepo.deleteById(id);

    }
    private void checkAuthority(User user, Store store){
        boolean isManager= user.getRole().equals(Role.STORE_MANAGER);
        boolean isAdmin= user.getRole().equals(Role.STORE_ADMIN);
        boolean isSameStore=user.equals(store.getStoreAdmin());

        if(!(isAdmin && isSameStore) && !isManager){
            throw new RuntimeException("you dont have permission to manage the category");
        }
    }
}
