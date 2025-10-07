package com.om.modal;

import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Embeddable
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StoreContact {
    private  String address;
    private String phone;
    @Email(message = "must be unique and valid")
    private  String email;
}
