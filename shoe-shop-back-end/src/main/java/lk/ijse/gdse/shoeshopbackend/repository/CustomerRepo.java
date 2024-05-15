package lk.ijse.gdse.shoeshopbackend.repository;

import lk.ijse.gdse.shoeshopbackend.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CustomerRepo extends JpaRepository<Customer,String> {
    Customer findTopByOrderByCodeDesc();
    List<Customer> findByName(String name);
    Customer findByCode(String id);

    /*custom JPQL query*/
    @Query("SELECT c.code FROM Customer c")
    List<String> findAllCustomerCodes();


}
