package lk.ijse.gdse.shoeshopbackend.dto;

import lk.ijse.gdse.shoeshopbackend.util.SupplierCategory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SupplierDTO {
    private String code;
    private String name;
    private String email;
    private SupplierCategory category;
    private String addressLine1;
    private String addressLine2;
    private String mobileContact;
    private String landLineContact;
}