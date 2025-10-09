package com.om.repository;

import com.om.modal.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepo extends JpaRepository<Customer , Long> {
    List<Customer> findByNameContainingIgnoreCaseOrEmailContainingIgnoreCase(String  keyword,String email);

}
