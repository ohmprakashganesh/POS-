package com.om.modal;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;

    private String name;

    @Column(nullable = false, unique = true)
    private String sku;

    private  String description;

    private  Double mrp;

    private String brand;

    private  String image;

    @ManyToOne
    private Category category;

    @ManyToOne
    private Store store;

    private LocalDateTime createdAt;

    private  LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate(){
        createdAt =LocalDateTime.now();
    }

    @PreUpdate
    protected  void onUpdate(){
        updatedAt= LocalDateTime.now();
    }




}
