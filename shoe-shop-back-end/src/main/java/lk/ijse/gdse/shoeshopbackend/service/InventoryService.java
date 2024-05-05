package lk.ijse.gdse.shoeshopbackend.service;

import lk.ijse.gdse.shoeshopbackend.dto.InventoryDTO;
import lk.ijse.gdse.shoeshopbackend.dto.SupplierDTO;

import java.util.List;

public interface InventoryService {
    InventoryDTO saveItem(InventoryDTO inventoryDTO);
    InventoryDTO updateItem(InventoryDTO inventoryDTO);
    boolean deleteItem(String id);
    List<InventoryDTO> getAllItem();
    List<InventoryDTO> searchItemByName(String name);
    InventoryDTO searchItemById(String id);
    String generateNextId();
    List<SupplierDTO> loadSupplierCode();
}
