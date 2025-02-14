package lk.ijse.gdse.shoeshopbackend.repository;

import jakarta.transaction.Transactional;
import lk.ijse.gdse.shoeshopbackend.dto.MostSoldItemDTO;
import lk.ijse.gdse.shoeshopbackend.entity.Employee;
import lk.ijse.gdse.shoeshopbackend.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface InventoryRepo extends JpaRepository<Inventory,String> {
    List<Inventory> findByDescription(String name);

    Inventory findByCode(String id);

    List<Inventory> findBySalePriceBetween(double minPrice, double maxPrice);

    List<Inventory> findByCategoryContaining(String value);

    @Query("SELECT i.code FROM Inventory i")
    List<String> findAllItemCodes();

    @Transactional
    @Modifying
    @Query(value = "UPDATE Inventory " +
            "SET " +
            "status = :status, " +
            "size_6 = CASE WHEN :size = 'Size_6' THEN :qty ELSE size_6 END, " +
            "size_7 = CASE WHEN :size = 'Size_7' THEN :qty ELSE size_7 END, " +
            "size_8 = CASE WHEN :size = 'Size_8' THEN :qty ELSE size_8 END, " +
            "size_9 = CASE WHEN :size = 'Size_9' THEN :qty ELSE size_9 END " +
            "WHERE code = :itemCode", nativeQuery = true)
    void updateByItemCodeAndSize(int qty, String status, String itemCode, String size);

    @Query(value = "SELECT CASE " +
            "   WHEN :size = 'Size_6' THEN i.size_6 " +
            "   WHEN :size = 'Size_7' THEN i.size_7 " +
            "   WHEN :size = 'Size_8' THEN i.size_8 " +
            "   WHEN :size = 'Size_9' THEN i.size_9 " +
            "   ELSE 0 " +
            "END " +
            "FROM Inventory i " +
            "WHERE i.code = :itemCode", nativeQuery = true)
    Integer findQtyByItemCodeAndSize(String itemCode, String size);

    /*admin panel*/
    @Query("SELECT new lk.ijse.gdse.shoeshopbackend.dto.MostSoldItemDTO(i, SUM(od.itemQty)) " +
            "FROM Inventory i " +
            "JOIN i.orderDetails od " +
            "JOIN od.order_id o " +
            "WHERE DATE(o.orderDate) = :date " +
            "GROUP BY i " +
            "ORDER BY SUM(od.itemQty) DESC")
    List<MostSoldItemDTO> findMostSoldItemByDate(LocalDate date);


}
