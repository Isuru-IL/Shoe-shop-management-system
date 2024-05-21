package lk.ijse.gdse.shoeshopbackend.dto;

import lk.ijse.gdse.shoeshopbackend.entity.Inventory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MostSoldItemDTO {
    private Inventory inventory;
    private Long totalQty;
}
