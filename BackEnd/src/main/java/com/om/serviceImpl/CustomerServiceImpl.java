package com.om.serviceImpl;

import com.om.modal.Customer;
import com.om.repository.CustomerRepo;
import com.om.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private  final CustomerRepo customerRepo;

    @Override
    public Customer createCustomer(Customer customer) {
     return   customerRepo.save(customer);
    }

    @Override
    public Customer updateCustomer(Long id, Customer customer) {
       Customer existing= customerRepo.findById(id).orElseThrow(()->new RuntimeException("not found customer to update "));
       existing.setPhone(customer.getPhone());
       existing.setName(customer.getName());
       existing.setUpdatedAt(customer.getUpdatedAt());
       existing.setEmail(customer.getEmail());
       return customerRepo.save(existing);
    }


    @Override
    public void deleteCustomer(Long id) {
        customerRepo.findById(id).orElseThrow(()-> new RuntimeException("not found customer to delte "));
            customerRepo.deleteById(id);
    }

    @Override
    public Customer getCustomer(Long id) {
       return  customerRepo.findById(id).orElseThrow(()-> new RuntimeException("not found customer with id"+id));
    }

    @Override
    public List<Customer> getAllCustomer() {
      return customerRepo.findAll();
    }

    @Override
    public List<Customer> searchCustomers(String keyword,String email) {
     return   customerRepo.findByNameContainingIgnoreCaseOrEmailContainingIgnoreCase(keyword,email);
    }
}
