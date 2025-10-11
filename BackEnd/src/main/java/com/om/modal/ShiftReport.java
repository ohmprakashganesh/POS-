package com.om.modal;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ShiftReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;

    private LocalDateTime shiftStart;
    private  LocalDateTime shiftEnd;

    private Double totalSales;
    private  Double totalRefunds;
    private Double netSale;
    private  int totalOrders;

    @ManyToOne
    private User cashier;

    @ManyToOne
    private Branch branch;

    @Transient 
    private List<PaymentSummery> paymentSummeries;

    @OneToMany
    private  List<Product> topSellingProducts;

    @OneToMany
    private List<Order> recentOrders;

    @OneToMany(mappedBy = "shiftReport", cascade = CascadeType.ALL)
    private  List<Refund> refund;





}
