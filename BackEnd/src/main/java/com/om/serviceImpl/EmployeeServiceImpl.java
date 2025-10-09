package com.om.serviceImpl;

import com.om.Mapper.Mappings;
import com.om.dto.UserDto;
import com.om.modal.Branch;
import com.om.modal.Role;
import com.om.modal.Store;
import com.om.modal.User;
import com.om.repository.BranchRepo;
import com.om.repository.StoreRepo;
import com.om.repository.UserRepo;
import com.om.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {


    private  final UserRepo userRepo;
    private  final PasswordEncoder passwordEncoder;
    private  final StoreRepo storeRepo;
    private  final BranchRepo branchRepo;


    @Override
    public UserDto createStoreEmployee(UserDto employee, Long storeId) throws Exception {
        Store store= storeRepo.findById(storeId).orElseThrow(()-> new RuntimeException("not found the store"));
        Branch branch=null;
        if(employee.getRole()==Role.BRANCH_MANAGER){
            if(employee.getBranchId()==null){
                throw new RuntimeException("branch id is required to assign the branch manager");
            }
            branch= branchRepo.findById(employee.getBranchId()).orElseThrow(()-> new RuntimeException("branch not found"));

        }
        User user= Mappings.dtoToUser(employee);
        user.setStore(store);
        user.setBranch(branch);
        user.setPassword(passwordEncoder.encode(employee.getPassword()));

        User saved= userRepo.save(user);

        if(employee.getRole()==Role.BRANCH_MANAGER && branch!=null){
            branch.setManager(saved);
            branchRepo.save(branch);
        }
        return  Mappings.userToDto(saved);
    }

    @Override
    public UserDto createBranchEmployee(UserDto employee, Long branchId) throws Exception {

     Branch branch = branchRepo.findById(branchId).orElseThrow(()-> new RuntimeException("branch not found"));

     if(employee.getRole()==Role.BRANCH_CASHIER ||
     employee.getRole()==Role.BRANCH_MANAGER
     ){
         User user= Mappings.dtoToUser(employee);
         user.setBranch(branch);
         user.setPassword(passwordEncoder.encode(employee.getPassword()));
         return  Mappings.userToDto(userRepo.save(user));
     }

     throw  new RuntimeException("branch is not supported");
    }


    @Override
    public User updateEmployee(Long employeeId, UserDto userDto) throws Exception {

        if (employeeId == null) {
            throw new IllegalArgumentException("Employee ID cannot be null");
        }
        if (userDto.getBranchId() == null) {
            throw new IllegalArgumentException("Branch ID cannot be null");
        }

        User existing = userRepo.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee does not exist"));

        Branch branch = branchRepo.findById(existing.getBranch().getId())
                .orElseThrow(() -> new RuntimeException("Branch not found"));

        existing.setEmail(userDto.getEmail());
        existing.setUpdatedAt(userDto.getUpdatedAt());
        existing.setPassword(passwordEncoder.encode(userDto.getPassword()));
        existing.setName(userDto.getName());
        existing.setPhone(userDto.getPhone());
        existing.setBranch(branch);
        return userRepo.save(existing);
    }


    @Override
    public void deleteEmployee(Long employeeId) {

        User user= userRepo.findById(employeeId).orElseThrow(()-> new RuntimeException("not found employee with id "+ employeeId));
        userRepo.delete(user);
    }

    @Override
    public List<User> findStoreEmployees(Long storeId, Role role) {
        Store store= storeRepo.findById(storeId).orElseThrow(()-> new RuntimeException("not found store with id "+ storeId));
        return  userRepo.findByStore(store).stream().filter(
                user -> role==null || user.getRole()==role
        ).collect(Collectors.toList());
    }

    @Override
    public List<User> findBranchEmployees(Long branchId, Role role) {
        Branch branch= branchRepo.findById(branchId).orElseThrow(()-> new RuntimeException("not found store with id "+ branchId));
        return  userRepo.findByBranch(branch);
    }
}
