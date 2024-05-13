package lk.ijse.gdse.shoeshopbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDTO {
    private String orderId;
    private Timestamp orderDate;
    private Double totalPrice;
    private Integer addedPoints;
    private String paymentMethod;
    private String cashierName;
    private String customer_id;
    private String customerName;
    private List<OrderDetailDTO> orderDetailDTOList;
}
