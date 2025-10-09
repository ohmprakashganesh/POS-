package com.om.controller;

import com.om.dto.CustomerDto;
import com.om.dto.UserDto;
import com.om.modal.Customer;
import com.om.modal.Role;
import com.om.modal.User;
import com.om.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customer")
@RequiredArgsConstructor
public class CustomerController {

        private final CustomerService customerService;


        // ✅ Create Customer
        @PostMapping("/create")
        public ResponseEntity<Customer> createStoreEmployee(@RequestBody Customer customer) throws Exception {
            Customer savedCustomer = customerService.createCustomer(customer);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedCustomer);
        }

        // ✅ Update Customer
        @PutMapping("/update/{cId}")
        public ResponseEntity<Customer> updateCustomer(@PathVariable("cId") Long cId, @RequestBody Customer customer) throws Exception {
            Customer updatedCustomer = customerService.updateCustomer(cId, customer);
            return ResponseEntity.ok(updatedCustomer);
        }

        // ✅ Delete Customer
        @DeleteMapping("/{cId}")
        public ResponseEntity<String> deleteCustomer(@PathVariable Long cId) {
            customerService.deleteCustomer(cId);
            return ResponseEntity.ok("deleted successfully");
        }

        // ✅ Get Single Customer
        @GetMapping("/{cId}")
        public ResponseEntity<Customer> getSingleCustomer(@PathVariable("cId") Long cId) {
            Customer customer = customerService.getCustomer(cId);
            return ResponseEntity.ok(customer);
        }

        // ✅ Get All Customers
        @GetMapping("/all")
        public ResponseEntity<List<Customer>> getAllCustomers() {
            List<Customer> customers = customerService.getAllCustomer();
            return ResponseEntity.ok(customers);
        }

        // ✅ Search Customers
        @PostMapping("/search")
        public ResponseEntity<List<Customer>> search(@RequestParam(required = false) String keyword, @RequestParam(required = false) String  email) throws Exception {
            List<Customer> customers = customerService.searchCustomers(keyword,email);
            return ResponseEntity.ok(customers);
        }
    }
