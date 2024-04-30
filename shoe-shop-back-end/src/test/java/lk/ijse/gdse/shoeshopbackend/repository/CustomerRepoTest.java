package lk.ijse.gdse.shoeshopbackend.repository;

import lk.ijse.gdse.shoeshopbackend.entity.Customer;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class CustomerRepoTest {

    @Autowired
    CustomerRepo customerRepo;
    @Test
    void findTopByOrderByCodeDesc() {
    }

    @Test
    void findByName() {
        List<Customer> customerList = customerRepo.findByName("Isuru");
        for (Customer customer : customerList) {
            System.out.println(customer);
        }
    }
}