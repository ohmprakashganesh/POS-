package com.om.controller;

import com.om.dto.BranchDto;
import com.om.modal.Branch;
import com.om.service.BranchService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/branch")
@AllArgsConstructor
public class BranchController {

    private  final BranchService branchService;

    @PostMapping("/create")
    public ResponseEntity<BranchDto> createBranch(@RequestBody BranchDto branchDto){
       return ResponseEntity.ok( branchService.createBranch(branchDto,null)) ;
    }

    @GetMapping("/{id}")
    public ResponseEntity<BranchDto> GetBranchById(@PathVariable Long id){
        return ResponseEntity.ok( branchService.getBrandById(id)) ;
    }

    @GetMapping("/store/{storeId}")
    public ResponseEntity<List<BranchDto>> getBranchByStoreId(@PathVariable Long id){
        return ResponseEntity.ok( branchService.getAllBranchesByStoreId(id)) ;
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<BranchDto> updateBranch(@PathVariable Long id, @RequestBody BranchDto branchDto){
        return ResponseEntity.ok( branchService.updateBranch(id,branchDto)) ;
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteBranch(@PathVariable Long id){
        branchService.deleteBranch(id);
        return ResponseEntity.ok("your branch deleted successfully");
    }







}
