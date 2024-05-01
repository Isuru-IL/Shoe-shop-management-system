package lk.ijse.gdse.shoeshopbackend.controller;

import lk.ijse.gdse.shoeshopbackend.dto.CustomerDTO;
import lk.ijse.gdse.shoeshopbackend.dto.SupplierDTO;
import lk.ijse.gdse.shoeshopbackend.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/supplier")
@CrossOrigin(origins = "*")
public class SupplierController {

    @Autowired
    private SupplierService supplierService;

    @PostMapping("/save")
    public SupplierDTO save(@RequestBody SupplierDTO supplierDTO){
        //System.out.println(supplierDTO);
        return supplierService.saveSupplier(supplierDTO);
    }

    @PatchMapping("/update")
    public SupplierDTO update(@RequestBody SupplierDTO supplierDTO){
        return supplierService.updateSupplier(supplierDTO);
    }

    @DeleteMapping("/delete")
    public boolean delete(@RequestParam("code") String code){
        return supplierService.deleteSupplier(code);
    }

    @GetMapping("/getAllSuppliers")
    public List<SupplierDTO> getAllSuppliers(){
        return supplierService.getAllSupplier();
    }

    @GetMapping("/searchByName")
    public List<SupplierDTO> searchByName(@RequestParam("name") String name){
        return supplierService.searchSupplier(name);
    }

    @GetMapping("/searchById")
    public SupplierDTO searchByID(@RequestParam("code")String code){
        return supplierService.searchSupplierById(code);
    }

    @GetMapping("/nextId")
    public String nextId(){
        return supplierService.generateNextId();
    }
}
