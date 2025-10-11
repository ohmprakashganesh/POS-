package com.om.modal;

import lombok.Data;

@Data
public class PaymentSummery {

    private  PaymentType type;
    private Double totalAmount;
    private  int transcationCount;
    private  double percentage;
}
