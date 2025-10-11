package com.om.modal;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderItems {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;

    private  int quantity;

    private  Double price;

    private  Double sellingPrice;

    @ManyToOne
    private Product product;

    @ManyToOne
    private  Order order;


}
