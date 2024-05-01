package lk.ijse.gdse.shoeshopbackend.repository;

import lk.ijse.gdse.shoeshopbackend.entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SupplierRepo extends JpaRepository<Supplier,String> {
    Supplier findTopByOrderByCodeDesc();
    List<Supplier> findByName(String name);

    Supplier findByCode(String id);
}
