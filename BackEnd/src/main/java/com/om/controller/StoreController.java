package com.om.controller;

import com.om.dto.StoreDto;
import com.om.modal.Store_Status;
import com.om.modal.User;
import com.om.service.StoreService;
import com.om.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/store")
@RequiredArgsConstructor
public class StoreController {


    private final StoreService storeService;
    private final UserService userService;

    // ✅ Create a new store
    @PostMapping("/create")
    public ResponseEntity<StoreDto> createStore(
            @RequestBody StoreDto storeDto,
            @RequestHeader("Authorization") String jwt) {
        User currentUser = userService.getUserFromJwtToken(jwt);
        StoreDto createdStore = storeService.createStore(storeDto, currentUser);
        return ResponseEntity.ok(createdStore);
    }

    // ✅ Get store by ID
    @GetMapping("/{id}")
    public ResponseEntity<StoreDto> getStoreById(@PathVariable Long id) {
        return ResponseEntity.ok(storeService.getStroeById(id));
    }

    // ✅ Get all stores
    @GetMapping
    public ResponseEntity<List<StoreDto>> getAllStores() {
        List<StoreDto> stores = storeService.getAllStores();
        return ResponseEntity.ok(stores);
    }

    // ✅ Update store (only admin)
    @PutMapping("/{id}")
    public ResponseEntity<StoreDto> updateStore(@PathVariable Long id, @RequestBody StoreDto storeDto) {
        StoreDto updatedStore = storeService.updateStore(id, storeDto);
        return ResponseEntity.ok(updatedStore);
    }

    @PutMapping("/{id}/moderate")
    public ResponseEntity<StoreDto> updateStoreType(@PathVariable Long id, @RequestParam Store_Status status) throws Exception {
        StoreDto updatedStore = storeService.moderateStore(id,status);
        return ResponseEntity.ok(updatedStore);
    }

    // ✅ Delete store by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStore(@PathVariable Long id) {
        storeService.deleteStore(id);
        return ResponseEntity.ok("Store deleted successfully");
    }

    // ✅ Get store by current admin
    @GetMapping("/admin")
    public ResponseEntity<?> getStoreByAdmin() {
        return ResponseEntity.ok(storeService.getStoreByAdmin());
    }

    // ✅ Get store by current employee
    @GetMapping("/employee")
    public ResponseEntity<StoreDto> getStoreByEmployee() {
        StoreDto store = storeService.getStoreByEmployee();
        return ResponseEntity.ok(store);
    }
}
