package lk.ijse.gdse.shoeshopbackend.service.impl;

import lk.ijse.gdse.shoeshopbackend.dto.CustomerDTO;
import lk.ijse.gdse.shoeshopbackend.dto.EmployeeDTO;
import lk.ijse.gdse.shoeshopbackend.entity.Customer;
import lk.ijse.gdse.shoeshopbackend.entity.Employee;
import lk.ijse.gdse.shoeshopbackend.repository.EmployeeRepo;
import lk.ijse.gdse.shoeshopbackend.service.EmployeeService;
import lk.ijse.gdse.shoeshopbackend.service.exception.DuplicateRecordException;
import lk.ijse.gdse.shoeshopbackend.service.exception.NotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepo employeeRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public EmployeeDTO saveEmployee(EmployeeDTO employeeDTO) {
        if (employeeRepo.existsById(employeeDTO.getCode())){
            throw new DuplicateRecordException("Employee Id is already exists!");
        }
        return mapper.map(employeeRepo.save(mapper.map(employeeDTO, Employee.class)), EmployeeDTO.class);
    }

    @Override
    public EmployeeDTO updateEmployee(EmployeeDTO employeeDTO) {
        if (!employeeRepo.existsById(employeeDTO.getCode())){
            throw new NotFoundException("Employee Id does not exists!");
        }

        return mapper.map(employeeRepo.save(mapper.map(employeeDTO, Employee.class)), EmployeeDTO.class);
    }

    @Override
    public boolean deleteEmployee(String id) {
        if (!employeeRepo.existsById(id)) {
            return false;
        }
        employeeRepo.deleteById(id);
        return !employeeRepo.existsById(id);
    }

    @Override
    public List<EmployeeDTO> getAllEmployee() {
        return employeeRepo.findAll().stream().map(employee -> mapper.map(employee,EmployeeDTO.class)).toList();
    }

    @Override
    public List<EmployeeDTO> searchEmployee(String name) {
        return null;
    }

    @Override
    public EmployeeDTO searchEmployeeById(String id) {
        if (!employeeRepo.existsById(id)){
            throw new NotFoundException("Employee Id does not exists!");
        }
//        return customerRepo.findById(id).map(customer -> mapper.map(customer, CustomerDTO.class)).get();
        Employee employee = employeeRepo.findByCode(id);
        //System.out.println(employee.getCode());
        return mapper.map(employee,EmployeeDTO.class);
    }
    @Override
    public EmployeeDTO searchByEmail(String email) {
        return mapper.map(employeeRepo.findByEmail(email),EmployeeDTO.class);
    }

    @Override
    public String generateNextId() {
        String prefix = "E";
        String id = "";

        Employee lastEmployee = employeeRepo.findTopByOrderByCodeDesc();
        int nextNumericPart;
        if (lastEmployee != null) {
            String lastCode = lastEmployee.getCode();
            String numericPartString = lastCode.substring(prefix.length());
            try {
                int numericPart = Integer.parseInt(numericPartString);
                nextNumericPart = numericPart + 1;
            } catch (NumberFormatException e) {
                nextNumericPart = 1;
            }
        } else {
            nextNumericPart = 1;
        }
        id = prefix + String.format("%04d", nextNumericPart);

        System.out.println("Employee next id ="+id);
        return id;
    }
}
