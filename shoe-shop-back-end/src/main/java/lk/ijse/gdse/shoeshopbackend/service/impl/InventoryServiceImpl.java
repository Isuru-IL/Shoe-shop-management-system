package lk.ijse.gdse.shoeshopbackend.service.impl;

import lk.ijse.gdse.shoeshopbackend.dto.EmployeeDTO;
import lk.ijse.gdse.shoeshopbackend.dto.InventoryDTO;
import lk.ijse.gdse.shoeshopbackend.dto.SupplierDTO;
import lk.ijse.gdse.shoeshopbackend.entity.Employee;
import lk.ijse.gdse.shoeshopbackend.entity.Inventory;
import lk.ijse.gdse.shoeshopbackend.repository.InventoryRepo;
import lk.ijse.gdse.shoeshopbackend.repository.SupplierRepo;
import lk.ijse.gdse.shoeshopbackend.service.InventoryService;
import lk.ijse.gdse.shoeshopbackend.service.exception.DuplicateRecordException;
import lk.ijse.gdse.shoeshopbackend.service.exception.NotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryServiceImpl implements InventoryService {

    @Autowired
    private ModelMapper mapper;
    @Autowired
    private InventoryRepo inventoryRepo;
    @Autowired
    private SupplierRepo supplierRepo;
    @Override
    public InventoryDTO saveItem(InventoryDTO inventoryDTO) {
        if (inventoryRepo.existsById(inventoryDTO.getCode())){
            throw new DuplicateRecordException("Item Code is already exists!");
        }
        return mapper.map(inventoryRepo.save(mapper.map(inventoryDTO, Inventory.class)), InventoryDTO.class);
    }

    @Override
    public InventoryDTO updateItem(InventoryDTO inventoryDTO) {
        if (!inventoryRepo.existsById(inventoryDTO.getCode())){
            throw new NotFoundException("Item Code does not exists!");
        }
        System.out.println("itemServiceUpdate");
        return mapper.map(inventoryRepo.save(mapper.map(inventoryDTO, Inventory.class)), InventoryDTO.class);
    }

    @Override
    public boolean deleteItem(String id) {
        if (!inventoryRepo.existsById(id)) {
            return false;
        }
        inventoryRepo.deleteById(id);
        return !inventoryRepo.existsById(id);
    }

    @Override
    public List<InventoryDTO> getAllItem() {
        return inventoryRepo.findAll().stream().map(inventory -> mapper.map(inventory,InventoryDTO.class)).toList();
    }

    @Override
    public List<InventoryDTO> searchItemByName(String name) {
        return inventoryRepo.findByDescription(name).stream().map(inventory -> mapper.map(inventory,InventoryDTO.class)).toList();
    }

    @Override
    public InventoryDTO searchItemById(String id) {
        if (!inventoryRepo.existsById(id)){
            throw new NotFoundException("Item Code does not exists!");
        }
        Inventory inventory = inventoryRepo.findByCode(id);
        //System.out.println(employee.getCode());
        return mapper.map(inventory,InventoryDTO.class);
    }

    @Override
    public String generateNextId() {
        return null;
    }

    @Override
    public List<SupplierDTO> loadSupplierCode() {
        return supplierRepo.findAll().stream().map(supplier -> mapper.map(supplier,SupplierDTO.class)).toList();
    }
}
