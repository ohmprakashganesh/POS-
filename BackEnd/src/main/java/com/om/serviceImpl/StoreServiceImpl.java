package com.om.serviceImpl;

import com.om.Mapper.StoreMapping;
import com.om.dto.StoreDto;
import com.om.exception.UserNotFountException;
import com.om.modal.Store;
import com.om.modal.StoreContact;
import com.om.modal.Store_Status;
import com.om.modal.User;
import com.om.repository.StoreRepo;
import com.om.service.StoreService;
import com.om.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StoreServiceImpl implements StoreService {

    private  final UserService userService;
    private  final StoreRepo storeRepo;



    @Override
    public StoreDto createStore(StoreDto storeDto, User user) {
        Store store = StoreMapping.dtoToStore(storeDto, user);
        return  StoreMapping.entityToDto(storeRepo.save(store));

    }

    @Override
    public StoreDto getStroeById(Long id) {
        Store store= storeRepo.findById(id).orElseThrow(()->new UserNotFountException("store not found with id "+ id));
        return  StoreMapping.entityToDto(store);
    }

    @Override
    public List<StoreDto> getAllStores() {
        List<Store> lists= storeRepo.findAll();
        return lists.stream().map(StoreMapping::entityToDto).collect(Collectors.toList());

    }

    @Override
    public Store getStoreByAdmin() {
       User admin= userService.getCurrentUser();
       return storeRepo.findByStoreAdminId(admin.getId());
    }

    @Override
    public StoreDto updateStore(Long id, StoreDto storeDto) {
     User currentUser= userService.getCurrentUser();
     Store existing= storeRepo.findByStoreAdminId(currentUser.getId());
     if(existing==null){
         throw new UserNotFountException("store not found");
     }
     existing.setBrand(storeDto.getBrand());
     existing.setDescription(storeDto.getDescription());

     if(storeDto.getStoreType() !=null){
         existing.setStoreType(storeDto.getStoreType());
     }
     if(storeDto.getContact() != null){
       existing.setContact(StoreContact.builder()
                 .address(storeDto.getContact().getAddress())
                         .phone(storeDto.getContact().getPhone())
                         .email(storeDto.getContact().getPhone())
                 .build());

     }
     Store updated= storeRepo.save(existing);
     return  StoreMapping.entityToDto(updated);
    }

    @Override
    public void deleteStore(Long id) {


    }

    @Override
    public StoreDto getStoreByEmployee() {
        User currentUser= userService.getCurrentUser();
        if(currentUser==null){
            throw new RuntimeException("unable to find the rights to access it");
        }
        return  StoreMapping.entityToDto(currentUser.getStore());
    }

    @Override
    public StoreDto moderateStore(Long id, Store_Status status) throws Exception {
       Store store= storeRepo.findById(id).orElseThrow(()-> new UserNotFountException("store not found"));
        store.setStatus(status);
        return StoreMapping.entityToDto(storeRepo.save(store));
    }
}
