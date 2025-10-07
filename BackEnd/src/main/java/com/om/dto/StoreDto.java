package com.om.dto;

import com.om.modal.StoreContact;
import com.om.modal.Store_Status;
import com.om.modal.User;
import jakarta.persistence.Column;
import jakarta.persistence.OneToOne;
import lombok.Data;

import java.time.LocalDateTime;
@Data

public class StoreDto {

    private  Long id;

    private  String brand;

    private LocalDateTime createdAt;

    private  LocalDateTime updatedAt;

    private UserDto storeAdmin;

    private  String description;

    private String storeType;

    private Store_Status status;

    private StoreContact contact;

}
