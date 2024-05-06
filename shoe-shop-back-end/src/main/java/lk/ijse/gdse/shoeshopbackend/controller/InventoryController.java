package lk.ijse.gdse.shoeshopbackend.controller;

import lk.ijse.gdse.shoeshopbackend.dto.InventoryDTO;
import lk.ijse.gdse.shoeshopbackend.dto.SupplierDTO;
import lk.ijse.gdse.shoeshopbackend.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/inventory")
@CrossOrigin(origins = "*")
public class InventoryController {
    @Autowired
    private InventoryService inventoryService;

    @GetMapping("/getAllItems")
    public List<InventoryDTO> getAllItem(){
        return inventoryService.getAllItem();
    }

    @PostMapping("/save")
    public InventoryDTO save(@RequestBody InventoryDTO inventoryDTO){
        return inventoryService.saveItem(inventoryDTO);
    }

    @PatchMapping("/update")
    public InventoryDTO update(@RequestBody InventoryDTO inventoryDTO){
        return inventoryService.updateItem(inventoryDTO);
    }

    @DeleteMapping("/delete")
    public boolean delete(@RequestParam("code") String code){
        return inventoryService.deleteItem(code);
    }

    @GetMapping("/searchByName")
    public List<InventoryDTO> searchByName(@RequestParam("name")String name){
        return inventoryService.searchItemByName(name);
    }

    @GetMapping("/searchById")
    public InventoryDTO searchById(@RequestParam("code") String code){
        return inventoryService.searchItemById(code);
    }

    @GetMapping("/loadSuppliersCode")
    public List<SupplierDTO> loadSuppliersCode(){
        return inventoryService.loadSupplierCode();
    }

    @GetMapping("/getAllItemsByPrice/{minPrice}/{maxPrice}")
    public List<InventoryDTO> getAllItemsByPrice(@PathVariable double minPrice,@PathVariable double maxPrice){
        return inventoryService.getAllItemsByPrice(minPrice, maxPrice);
    }

    @GetMapping("/getAllItemsByCategoryGender")
    public List<InventoryDTO> getAllItemsByGender(@RequestParam("gender") String gender){
        System.out.println("gender = "+gender);
        return inventoryService.getAllItemsByGender(gender);
    }

    @GetMapping("/getAllItemsByCategoryOccasion")
    public List<InventoryDTO> getAllItemsByOccasion(@RequestParam("occasion") String occasion){
        System.out.println("occasion = "+occasion);
        return inventoryService.getAllItemsByGender(occasion);
    }
}
