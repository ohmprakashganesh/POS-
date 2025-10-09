package com.om.controller;

import com.om.dto.UserDto;
import com.om.modal.Role;
import com.om.modal.User;
import com.om.service.EmployeeService;
import com.om.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employee")
@RequiredArgsConstructor
public class EmployeeController {

    private  final EmployeeService userService;

    @PostMapping("/store/{storeId}")
    public UserDto createStoreEmployee(@RequestBody UserDto employee, @PathVariable Long storeId) throws Exception {
        return userService.createStoreEmployee(employee, storeId);
    }

    @PostMapping("/branch/{branchId}")
    public UserDto createBranchEmployee(@RequestBody UserDto employee, @PathVariable Long branchId) throws Exception {
        return userService.createBranchEmployee(employee, branchId);
    }

    @PutMapping("/update/{employeeId}")
    public User updateEmployee(@PathVariable("employeeId") Long employeeId, @RequestBody UserDto employee) throws Exception {
        return userService.updateEmployee(employeeId, employee);
    }

    @DeleteMapping("/{employeeId}")
    public void deleteEmployee(@PathVariable Long employeeId) {
        userService.deleteEmployee(employeeId);
    }

    @GetMapping("/store/{storeId}")
    public List<User> findStoreEmployees(@PathVariable Long storeId, @RequestParam(required = false) Role role) {
        return userService.findStoreEmployees(storeId, role);
    }

    @GetMapping("/branch/{branchId}")
    public List<User> findBranchEmployees(@PathVariable Long branchId, @RequestParam(required = false) Role role) {
        return userService.findBranchEmployees(branchId, role);
    }
}
