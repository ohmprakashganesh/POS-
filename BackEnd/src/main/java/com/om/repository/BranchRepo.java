package com.om.repository;

import com.om.modal.Branch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BranchRepo extends  JpaRepository<Branch , Long> {


        List<Branch> findByStoreId(Long storeId);



}
