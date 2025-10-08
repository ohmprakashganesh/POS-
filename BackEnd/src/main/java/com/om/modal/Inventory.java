package com.om.modal;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;

    @ManyToOne
    private  Branch branch;

    @ManyToOne
    private Product product;

    @Column(nullable = false)
    private  Long quantity;

    private LocalDateTime lastUpdated;

    @PrePersist
    @PreUpdate
    protected  void onUpdate(){
        lastUpdated= LocalDateTime.now();
    }


}
