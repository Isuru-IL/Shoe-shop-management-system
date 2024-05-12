package lk.ijse.gdse.shoeshopbackend.service;

import lk.ijse.gdse.shoeshopbackend.dto.CustomerDTO;
import lk.ijse.gdse.shoeshopbackend.dto.InventoryDTO;

import java.util.List;

public interface PlaceOrderService {

    InventoryDTO searchItemByCode(String code);
    List<String> getAllItemCodes();
    CustomerDTO searchCustomerById(String code);
    List<String> getAllCustomerIds();
    String generateNextOrderId();
}
