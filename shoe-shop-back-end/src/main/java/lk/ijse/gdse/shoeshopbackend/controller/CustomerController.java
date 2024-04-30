package lk.ijse.gdse.shoeshopbackend.controller;

import lk.ijse.gdse.shoeshopbackend.dto.CustomerDTO;
import lk.ijse.gdse.shoeshopbackend.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/customer")
@CrossOrigin(origins = "*")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    public CustomerController(){
        System.out.println("customer working");
    }

    @PostMapping("/save")
    public CustomerDTO save(@RequestBody CustomerDTO customerDTO){
        System.out.println(customerDTO);
        return customerService.saveCustomer(customerDTO);
    }

    @PatchMapping("/update")
    public CustomerDTO update(@RequestBody CustomerDTO customerDTO){
        return customerService.updateCustomer(customerDTO);
    }

    @GetMapping("/getAllCustomers")
    public List<CustomerDTO> getAllCustomers(){
        return customerService.getAllCustomer();
    }

    @GetMapping("/searchByName")
    public List<CustomerDTO> searchByName(@RequestParam("name") String name){
        return customerService.searchCustomer(name);
    }

    @GetMapping("/nextId")
    public String nextId(){
        return customerService.generateNextId();
    }
}
