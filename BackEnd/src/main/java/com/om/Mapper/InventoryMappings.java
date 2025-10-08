package com.om.Mapper;

import com.om.dto.InventoryDto;
import com.om.modal.Branch;
import com.om.modal.Inventory;
import com.om.modal.Product;

public class InventoryMappings {

    public  static InventoryDto toDto(Inventory inventory){
        InventoryDto inventoryDto= new InventoryDto();
        inventoryDto.setId(inventory.getId());
        inventoryDto.setQuantity(inventory.getQuantity());
        inventoryDto.setLastUpdated(inventory.getLastUpdated());
        inventoryDto.setBranchId(inventory.getBranch().getId());
        inventoryDto.setProductId(inventory.getProduct().getId());
        inventoryDto.setProduct(ProductMappings.productToDto(inventory.getProduct()));
        return  inventoryDto;
    }

    public  static Inventory toEntity(InventoryDto inventoryDto, Branch branch, Product product){
        Inventory inventory= new Inventory();

        inventory.setQuantity(inventoryDto.getQuantity());
        inventory.setBranch(branch);
        inventory.setProduct(product);

        return  inventory;
    }


}
