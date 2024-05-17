package lk.ijse.gdse.shoeshopbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomDTO {
    private String orderId;
    private String itemCode;
    private String size;
    private Integer qty;
    private Double unitTotalPrice;
    private Integer arrayLength;
}
