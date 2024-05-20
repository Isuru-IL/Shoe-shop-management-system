package lk.ijse.gdse.shoeshopbackend.service;

import lk.ijse.gdse.shoeshopbackend.dto.EmployeeDTO;

import java.util.List;

public interface EmployeeService {
    EmployeeDTO saveEmployee(EmployeeDTO employeeDTO);
    EmployeeDTO updateEmployee(EmployeeDTO employeeDTO);
    boolean deleteEmployee(String id);
    List<EmployeeDTO> getAllEmployee();
    List<EmployeeDTO> searchEmployee(String name);
    EmployeeDTO searchEmployeeById(String id);
    String generateNextId();
    EmployeeDTO searchByEmail(String email);
}
