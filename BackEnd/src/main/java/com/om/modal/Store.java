package com.om.modal;

import jakarta.persistence.*;
import lombok.Data;

import java.security.PrivateKey;
import java.time.LocalDateTime;

@Data
@Entity
public class Store {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;

    @Column(nullable = false)
    private  String brand;

    private LocalDateTime createdAt;
    private  LocalDateTime updatedAt;

    @OneToOne
    private  User storeAdmin;

    private  String description;

    private String storeType;

    private  Store_Status status;

    @Embedded
    private  StoreContact contact= new StoreContact();

    @PrePersist
    protected  void onCreate(){
        createdAt= LocalDateTime.now();
        status=Store_Status.PENDING;
    }
    @PreUpdate
    protected  void onUpdate(){
        updatedAt= LocalDateTime.now();
    }




}
