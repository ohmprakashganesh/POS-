package com.om.modal;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private  double totalAmount;

    private LocalDateTime createdAt;

    private  PaymentType paymentType;

    @ManyToOne
    private Branch branch;

    @ManyToOne
    private User cashier;

    @ManyToOne
    private Customer customer;


    @OneToMany
    private List<OrderItems> items;


}
