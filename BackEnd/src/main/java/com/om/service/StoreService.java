package com.om.service;

import com.om.dto.StoreDto;
import com.om.modal.Store;
import com.om.modal.Store_Status;
import com.om.modal.User;

import java.util.List;

public interface StoreService {

    StoreDto createStore(StoreDto storeDto, User user);
    StoreDto getStroeById(Long id);
    List<StoreDto> getAllStores();
    Store getStoreByAdmin();
    StoreDto updateStore(Long id, StoreDto storeDto);
    void deleteStore(Long id);
    StoreDto getStoreByEmployee();

    StoreDto moderateStore(Long id, Store_Status status) throws  Exception;

}
