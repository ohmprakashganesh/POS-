package com.om.Mapper;

import com.om.dto.StoreDto;
import com.om.dto.UserDto;
import com.om.modal.Store;
import com.om.modal.User;

public class StoreMapping {

    public static Store dtoToStore(StoreDto dto, User storeAdmin) {
        if (dto == null) return null;

        Store store = new Store();
        store.setId(dto.getId());
        store.setBrand(dto.getBrand());
        store.setCreatedAt(dto.getCreatedAt());
        store.setUpdatedAt(dto.getUpdatedAt());
        store.setDescription(dto.getDescription());
        store.setStoreType(dto.getStoreType());
        store.setStatus(dto.getStatus());
        store.setContact(dto.getContact());
        store.setStoreAdmin(storeAdmin);

        return store;
    }

    // ✅ Entity → DTO
    public static StoreDto entityToDto(Store store) {
        if (store == null) return null;

        StoreDto dto = new StoreDto();
        dto.setId(store.getId());
        dto.setBrand(store.getBrand());
        dto.setCreatedAt(store.getCreatedAt());
        dto.setUpdatedAt(store.getUpdatedAt());
        dto.setDescription(store.getDescription());
        dto.setStoreType(store.getStoreType());
        dto.setStatus(store.getStatus());
        dto.setContact(store.getContact());
        dto.setStoreAdmin(Mappings.userToDto(store.getStoreAdmin()));

        return dto;
    }

    // 🔹 Helper: Convert UserDto → User


}
