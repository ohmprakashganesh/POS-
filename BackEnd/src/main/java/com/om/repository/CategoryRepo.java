package com.om.repository;

import com.om.modal.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepo extends JpaRepository<Category , Long> {
    List<Category> findByStoreId(Long id);
}
