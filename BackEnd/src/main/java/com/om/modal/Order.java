package com.om.modal;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity()
@Table(name = "orders")
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


    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItems> items=new ArrayList<>();

    @PrePersist
    protected  void onCreate(){
        createdAt=LocalDateTime.now();
    }


}
