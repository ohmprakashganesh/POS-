package com.om.repository;

import com.om.modal.Store;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoreRepo extends JpaRepository<Store , Long> {
    Store findByStoreAdminId(Long adminId);
}
