package com.om.serviceImpl;

import com.om.Mapper.InventoryMappings;
import com.om.dto.InventoryDto;
import com.om.modal.Branch;
import com.om.modal.Inventory;
import com.om.modal.Product;
import com.om.repository.BranchRepo;
import com.om.repository.InventoryRepo;
import com.om.repository.ProductRepo;
import com.om.service.InventoryService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InventoryServiceImpl implements InventoryService {

    private  final InventoryRepo inventoryRepo;
    private  final BranchRepo branchRepo;
    private  final ProductRepo productRepo;


    @Override
    public InventoryDto createInventory(InventoryDto inventoryDto) {
      Branch branch= branchRepo.findById(inventoryDto.getBranchId()).orElseThrow(()-> new RuntimeException("not found the branch with given id"));
        Product product= productRepo.findById(inventoryDto.getProductId()).orElseThrow(()-> new RuntimeException("not found the branch with given id"));

        Inventory inventory= inventoryRepo.save(InventoryMappings.toEntity(inventoryDto,branch,product));
        return  InventoryMappings.toDto(inventory);

    }

    @Override
    public InventoryDto updateInventory(Long id, InventoryDto inventoryDto) {
       Inventory inventory= inventoryRepo.findById(id).orElseThrow(()-> new RuntimeException("not found the inventory "));
       inventory.setQuantity(inventoryDto.getQuantity());

       Inventory updated= inventoryRepo.save(inventory);
       return InventoryMappings.toDto(updated);
    }

    @Override
    public void deleteInventory(Long id) {
        Inventory inventory= inventoryRepo.findById(id).orElseThrow(()-> new RuntimeException("not found the inventory "));
        inventoryRepo.deleteById(id);

    }

    @Override
    public InventoryDto getInventoryById(Long id) {
        Inventory inventory= inventoryRepo.findById(id).orElseThrow(()-> new RuntimeException("not found the inventory "));
        return  InventoryMappings.toDto(inventory);
    }

    @Override
    public InventoryDto getInventoryByProductIdAndBranchId(Long productId, Long branchId) {
        Inventory inventory= inventoryRepo.findByProductIdAndBranchId(productId,branchId);
        return  InventoryMappings.toDto(inventory);
    }

    @Override
    public List<InventoryDto> getAllInventoryByBranchId(Long branchId) {
       List<Inventory> lists= inventoryRepo.findByBranchId(branchId);
       return lists.stream().map(InventoryMappings::toDto).collect(Collectors.toList());
    }
}
