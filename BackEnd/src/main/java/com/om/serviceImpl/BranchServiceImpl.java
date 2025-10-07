package com.om.serviceImpl;

import com.om.Mapper.BranchMappings;
import com.om.dto.BranchDto;
import com.om.modal.Branch;
import com.om.modal.Store;
import com.om.modal.User;
import com.om.repository.BranchRepo;
import com.om.repository.StoreRepo;
import com.om.service.BranchService;
import com.om.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BranchServiceImpl implements BranchService {

    private  final BranchRepo branchRepo;
    private  final StoreRepo storeRepo;
    private  final UserService userService;

    @Override
    public BranchDto createBranch(BranchDto branchDto, User user) {
        User currentUser = userService.getCurrentUser();
        Store store= storeRepo.findByStoreAdminId(currentUser.getId());
        Branch branch = BranchMappings.dtoToBranch(branchDto,store);

        Branch saved = branchRepo.save(branch);
        return  BranchMappings.branchToDto(saved);
    }

    @Override
    public BranchDto updateBranch(Long id, BranchDto branchDto) {
        Branch existing= branchRepo.findById(id).orElseThrow(()-> new RuntimeException("not found branch with id "));
        existing.setName(branchDto.getName());
        existing.setEmail(branchDto.getEmail());
        existing.setCloseTime(branchDto.getCloseTime());
        existing.setOpenTime(branchDto.getOpenTime());
        existing.setAddress(branchDto.getAddress());
        existing.setUpdatedAt(branchDto.getUpdatedAt());
        existing.setPhone(branchDto.getPhone());
        existing.setWorkingDays(branchDto.getWorkingDays());

        return  BranchMappings.branchToDto(branchRepo.save(existing));

    }

    @Override
    public void deleteBranch(Long id) {
        Branch existing= branchRepo.findById(id).orElseThrow(()-> new RuntimeException("not found branch with id "));
          if(existing!=null){
              branchRepo.deleteById(id);
          }
    }

    @Override
    public List<BranchDto> getAllBranchesByStoreId(Long storeId) {
      List<Branch> lists= branchRepo.findByStoreId(storeId);
      return lists.stream().map(BranchMappings::branchToDto).collect(Collectors.toList());
    }

    @Override
    public BranchDto getBrandById(Long id) {
       Branch branch= branchRepo.findById(id).orElseThrow(()-> new RuntimeException("not found branch of the id "+id));
        return BranchMappings.branchToDto(branch);
    }
}
