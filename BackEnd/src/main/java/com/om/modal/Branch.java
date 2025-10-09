package com.om.modal;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Branch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;

    private String name;

    private  String phone;

    private  String address;

    private  String email;

    @ElementCollection
    private List<String> workingDays;

    private LocalTime openTime;

    private  LocalTime closeTime;

    private  LocalDateTime createdAt;

    private  LocalDateTime updatedAt;

    @ManyToOne
    private  Store store;

    @OneToOne(cascade = CascadeType.REMOVE)
    private User manager;


    @PrePersist
    protected void onCreate(){
        createdAt = LocalDateTime.now();
    }

    @PreUpdate
    protected  void onUpdate(){
        updatedAt= LocalDateTime.now();
    }

}
