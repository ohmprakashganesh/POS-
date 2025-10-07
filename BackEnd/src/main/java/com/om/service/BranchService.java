package com.om.service;

import com.om.dto.BranchDto;
import com.om.modal.User;

import java.util.List;

public interface BranchService {

    BranchDto createBranch(BranchDto branchDto, User user);
    BranchDto updateBranch(Long id,BranchDto branchDto);
    void deleteBranch(Long id);
    List<BranchDto> getAllBranchesByStoreId(Long storeId);
    BranchDto getBrandById(Long id);


}
