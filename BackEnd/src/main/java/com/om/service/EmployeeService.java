package com.om.service;

import com.om.dto.UserDto;
import com.om.modal.Role;
import com.om.modal.User;

import java.util.List;

public interface EmployeeService {

    UserDto createStoreEmployee(UserDto employee, Long storeId) throws  Exception;
    UserDto createBranchEmployee(UserDto employee, Long branchId) throws  Exception;
    User updateEmployee( Long employeeId, UserDto employee) throws  Exception;
    void deleteEmployee(Long employeeId);
    List<User> findStoreEmployees(Long storeId, Role role);
    List<User> findBranchEmployees(Long branchId, Role role);


}
