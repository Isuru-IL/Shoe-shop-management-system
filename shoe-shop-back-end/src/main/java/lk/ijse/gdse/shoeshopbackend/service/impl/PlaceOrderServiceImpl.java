package lk.ijse.gdse.shoeshopbackend.service.impl;

import lk.ijse.gdse.shoeshopbackend.dto.CustomerDTO;
import lk.ijse.gdse.shoeshopbackend.dto.InventoryDTO;
import lk.ijse.gdse.shoeshopbackend.entity.Employee;
import lk.ijse.gdse.shoeshopbackend.entity.Order;
import lk.ijse.gdse.shoeshopbackend.repository.CustomerRepo;
import lk.ijse.gdse.shoeshopbackend.repository.InventoryRepo;
import lk.ijse.gdse.shoeshopbackend.repository.OrderRepo;
import lk.ijse.gdse.shoeshopbackend.service.PlaceOrderService;
import lk.ijse.gdse.shoeshopbackend.service.exception.NotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlaceOrderServiceImpl implements PlaceOrderService {

    @Autowired
    private OrderRepo orderRepo;
    @Autowired
    private CustomerRepo customerRepo;
    @Autowired
    private InventoryRepo inventoryRepo;
    @Autowired
    private ModelMapper mapper;

    @Override
    public InventoryDTO searchItemByCode(String code) {
        if (!inventoryRepo.existsById(code)){
            throw new NotFoundException("Item Code does not exists!");
        }
        return mapper.map(inventoryRepo.findByCode(code),InventoryDTO.class);
    }

    @Override
    public List<String> getAllItemCodes() {
        return inventoryRepo.findAllItemCodes();
    }

    @Override
    public CustomerDTO searchCustomerById(String code) {
        if (!customerRepo.existsById(code)){
            throw new NotFoundException("Customer Code does not exists!");
        }
        return mapper.map(customerRepo.findByCode(code),CustomerDTO.class);
    }

    @Override
    public List<String> getAllCustomerIds() {
        return customerRepo.findAllCustomerCodes();
    }

    @Override
    public String generateNextOrderId() {
        String prefix = "ORD-";
        String id = "";

        Order lastOrder = orderRepo.findTopByOrderByOrderIdDesc();
        int nextNumericPart;
        if (lastOrder != null) {
            String lastCode = lastOrder.getOrderId();
            String numericPartString = lastCode.substring(prefix.length());
            try {
                int numericPart = Integer.parseInt(numericPartString);
                nextNumericPart = numericPart + 1;
            } catch (NumberFormatException e) {
                nextNumericPart = 1;
            }
        } else {
            nextNumericPart = 1;
        }
        id = prefix + String.format("%04d", nextNumericPart);

        System.out.println("Order next id ="+id);
        return id;
    }
}
