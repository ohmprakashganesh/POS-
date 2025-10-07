package com.om.Mapper;

import com.om.dto.BranchDto;
import com.om.dto.UserDto;
import com.om.modal.Branch;
import com.om.modal.Store;
import com.om.modal.User;

public class BranchMappings {

    public static Branch dtoToBranch(BranchDto dto, Store store) {
        Branch branch = new Branch();
        branch.setId(dto.getId());
        branch.setName(dto.getName());
        branch.setPhone(dto.getPhone());
        branch.setEmail(dto.getEmail());
        branch.setWorkingDays(dto.getWorkingDays());
        branch.setOpenTime(dto.getOpenTime());
        branch.setCloseTime(dto.getCloseTime());
        branch.setCreatedAt(dto.getCreatedAt());
        branch.setUpdatedAt(dto.getUpdatedAt());
        branch.setAddress(dto.getAddress());

        branch.setStore(store);
        return branch;
    }

    public static BranchDto branchToDto(Branch branch) {
        BranchDto dto = new BranchDto();

        dto.setId(branch.getId());
        dto.setName(branch.getName());
        dto.setPhone(branch.getPhone());
        dto.setEmail(branch.getEmail());
        dto.setAddress(branch.getAddress());
        dto.setWorkingDays(branch.getWorkingDays());
        dto.setOpenTime(branch.getOpenTime());
        dto.setCloseTime(branch.getCloseTime());
        dto.setCreatedAt(branch.getCreatedAt());
        dto.setUpdatedAt(branch.getUpdatedAt());

        // ✅ Only set store ID (avoid full entity mapping)
        if (branch.getStore() != null) {
            dto.setStoreId(branch.getStore().getId());
        }
        return dto;
    }
}
