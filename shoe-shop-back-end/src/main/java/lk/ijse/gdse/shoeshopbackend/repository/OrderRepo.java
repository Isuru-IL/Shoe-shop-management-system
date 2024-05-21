package lk.ijse.gdse.shoeshopbackend.repository;

import lk.ijse.gdse.shoeshopbackend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.List;

public interface OrderRepo extends JpaRepository<Order,String> {
    Order findTopByOrderByOrderIdDesc();

    @Query(value = "SELECT * FROM orders WHERE order_date >= DATE_SUB(CURRENT_TIMESTAMP, INTERVAL 3 DAY)", nativeQuery = true)
    List<Order> getAllRefundOrders();

    @Query(value = "SELECT * FROM orders WHERE order_id =:orderId", nativeQuery = true)
    Order findByOrderId(String orderId);

    Order findOrderByOrderId(String orderId);

    @Query("SELECT COUNT(o) FROM Order o WHERE o.orderDate >= :startOfDay AND o.orderDate < :endOfDay")
    Integer countOrdersForDate(Timestamp startOfDay, Timestamp endOfDay);

    @Query("SELECT SUM(o.totalPrice) FROM Order o WHERE o.orderDate >= :startOfDay AND o.orderDate < :endOfDay")
    Double sumTotalPriceForDate(Timestamp startOfDay, Timestamp endOfDay);

    @Query("SELECT o FROM Order o WHERE DATE(o.orderDate) = :date")
    List<Order> findOrdersByDate(LocalDate date);
}
