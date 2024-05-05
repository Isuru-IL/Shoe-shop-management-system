package lk.ijse.gdse.shoeshopbackend.repository;

import lk.ijse.gdse.shoeshopbackend.entity.Employee;
import lk.ijse.gdse.shoeshopbackend.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InventoryRepo extends JpaRepository<Inventory,String> {
    List<Inventory> findByDescription(String name);

    Inventory findByCode(String id);
}
