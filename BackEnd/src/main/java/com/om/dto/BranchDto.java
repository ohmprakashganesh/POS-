package com.om.dto;

import com.om.modal.Store;
import com.om.modal.User;
import jakarta.persistence.CascadeType;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BranchDto {

    private  Long id;

    private String name;

    private  String phone;

    private  String email;

    private  String  address;

    private List<String> workingDays;

    private LocalTime openTime;

    private  LocalTime closeTime;

    private LocalDateTime createdAt;

    private  LocalDateTime updatedAt;

    private Long storeId;

    private UserDto manager;
}
