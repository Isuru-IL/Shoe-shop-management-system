package lk.ijse.gdse.shoeshopbackend.entity;

import jakarta.persistence.*;
import lk.ijse.gdse.shoeshopbackend.embedded.OrderDetailPK;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "order_detail")
public class OrderDetail {
    @EmbeddedId
    private OrderDetailPK orderDetailPK;

    private String itemName;
    private Double unitPrice;
    private Integer itemQty;

    @ManyToOne
    @JoinColumn(name = "order_id",
            referencedColumnName = "order_id",insertable = false,
            updatable = false)
    private Order order_id;

    @ManyToOne
    @JoinColumn(name = "item_code",
            referencedColumnName = "code",
            insertable = false,
            updatable = false)
    private Inventory item_code;
}
