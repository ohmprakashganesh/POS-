package com.om.controller;

import com.om.dto.BranchDto;
import com.om.dto.InventoryDto;
import com.om.service.BranchService;
import com.om.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
public class InventoryController {


    private  final BranchService branchService;
    private  final InventoryService inventoryService;

    @PostMapping("/create")
    public ResponseEntity<InventoryDto> createBranch(@RequestBody InventoryDto inventoryDto){
        return ResponseEntity.ok( inventoryService.createInventory(inventoryDto)) ;
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<InventoryDto> updateInventory(@PathVariable Long id, @RequestBody InventoryDto inventoryDto){
        return ResponseEntity.ok( inventoryService.updateInventory(id,inventoryDto));
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteBranch(@PathVariable Long id){
        inventoryService.deleteInventory(id);
        return ResponseEntity.ok("your inventory deleted successfully");
    }


    @GetMapping("/branch/{id}")
    public ResponseEntity<List<InventoryDto> >getInventoryByBranch(@PathVariable Long id){
        return ResponseEntity.ok( inventoryService.getAllInventoryByBranchId(id)) ;
    }

    @GetMapping("/{id}")
    public ResponseEntity<InventoryDto>getInventoryById(@PathVariable Long id){
        return ResponseEntity.ok( inventoryService.getInventoryById(id)) ;
    }


    @GetMapping("/branch/{branchId}/product/{productId}")
    public ResponseEntity<InventoryDto> getInventoryByBranchAndProduct(@PathVariable Long branchId, @PathVariable Long productId ){
        return ResponseEntity.ok(inventoryService.getInventoryByProductIdAndBranchId(branchId,productId)) ;
    }
}
