package lk.ijse.gdse.shoeshopbackend.repository;

import lk.ijse.gdse.shoeshopbackend.entity.Customer;
import lk.ijse.gdse.shoeshopbackend.util.CustomerLoyaltyLevel;
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

    Integer countByLoyaltyLevel(CustomerLoyaltyLevel level);

    @Query("SELECT c FROM Customer c WHERE MONTH(c.dob) = MONTH(CURRENT_DATE) AND DAY(c.dob) = DAY(CURRENT_DATE)")
    List<Customer> findCustomersByBirthdayToday();

}
