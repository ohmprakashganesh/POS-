package com.om.service;

import com.om.modal.Customer;

import java.util.List;

public interface CustomerService {
    Customer createCustomer(Customer customer);
    Customer updateCustomer(Long id, Customer customer);
    void deleteCustomer(Long id);
    Customer getCustomer(Long id);
    List<Customer> getAllCustomer();
    List<Customer> searchCustomers(String keyword,String email);
}
