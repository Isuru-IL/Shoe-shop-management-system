package lk.ijse.gdse.shoeshopbackend.dto;

import lk.ijse.gdse.shoeshopbackend.util.CustomerLoyaltyLevel;
import lk.ijse.gdse.shoeshopbackend.util.Gender;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.sql.Timestamp;
import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CustomerDTO {
    private String code;
    private String name;
    private String email;
    private Gender gender;
    private String contact;
    private Date dob;
    private String addressLine1;
    private String addressLine2;
    private Date loyaltyDate;
    private CustomerLoyaltyLevel loyaltyLevel;
    private Integer loyaltyPoint;
    private Timestamp recentPurchaseDate;
}
