package lk.ijse.gdse.shoeshopbackend.controller;

import lk.ijse.gdse.shoeshopbackend.dto.CustomerDTO;
import lk.ijse.gdse.shoeshopbackend.dto.InventoryDTO;
import lk.ijse.gdse.shoeshopbackend.service.PlaceOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/placeOrder")
@CrossOrigin(origins = "*")
public class PlaceOrderController {
    @Autowired
    private PlaceOrderService placeOrderService;


    @GetMapping("/searchItemByCode")
    public InventoryDTO searchItemByCode(@RequestParam("code") String code){
        return placeOrderService.searchItemByCode(code);
    }
    @GetMapping("/loadItemCodes")
    public List<String> loadItemCodes(){
        return placeOrderService.getAllItemCodes();
    }
    @GetMapping("/searchCusById")
    public CustomerDTO searchCustomerById(@RequestParam("code") String code){
        return placeOrderService.searchCustomerById(code);
    }
    @GetMapping("/loadCusIds")
    public List<String> loadCustomerIds(){
        return placeOrderService.getAllCustomerIds();
    }

    @GetMapping("/nextOrderId")
    public String nextOrderId(){
        return placeOrderService.generateNextOrderId();
    }
}
