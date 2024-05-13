package lk.ijse.gdse.shoeshopbackend.service;

import lk.ijse.gdse.shoeshopbackend.dto.CustomerDTO;
import lk.ijse.gdse.shoeshopbackend.dto.InventoryDTO;
import lk.ijse.gdse.shoeshopbackend.dto.OrderDTO;

import java.util.List;

public interface PlaceOrderService {

    void placeOrder(OrderDTO orderDTO);
    InventoryDTO searchItemByCode(String code);
    List<String> getAllItemCodes();
    CustomerDTO searchCustomerById(String code);
    List<String> getAllCustomerIds();
    String generateNextOrderId();
}
