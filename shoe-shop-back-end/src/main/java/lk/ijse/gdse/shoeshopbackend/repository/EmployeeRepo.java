package lk.ijse.gdse.shoeshopbackend.repository;

import lk.ijse.gdse.shoeshopbackend.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployeeRepo extends JpaRepository<Employee,String> {
    Employee findTopByOrderByCodeDesc();
    List<Employee> findByName(String name);

    Employee findByCode(String id);
}
