package lk.ijse.gdse.shoeshopbackend.service.impl;

import lk.ijse.gdse.shoeshopbackend.dto.CustomerDTO;
import lk.ijse.gdse.shoeshopbackend.entity.Customer;
import lk.ijse.gdse.shoeshopbackend.repository.CustomerRepo;
import lk.ijse.gdse.shoeshopbackend.service.CustomerService;
import lk.ijse.gdse.shoeshopbackend.service.exception.DuplicateRecordException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepo customerRepo;

    @Autowired
    private ModelMapper mapper;
    @Override
    public CustomerDTO saveCustomer(CustomerDTO customerDTO) {
        if (customerRepo.existsById(customerDTO.getCode())){
            throw new DuplicateRecordException("Customer Id is already exists!");
        }
        return mapper.map(customerRepo.save(mapper.map(customerDTO, Customer.class)), CustomerDTO.class);
    }

    @Override
    public CustomerDTO updateCustomer(CustomerDTO customerDTO) {
        return null;
    }

    @Override
    public boolean deleteCustomer(String id) {
        return false;
    }

    @Override
    public List<CustomerDTO> getAllCustomer() {
        return null;
    }

    @Override
    public List<CustomerDTO> searchCustomer(String name) {
        return null;
    }

    @Override
    public String generateNextId() {
        String prefix = "C";
        String id = "";

        Customer lastCustomer = customerRepo.findTopByOrderByCodeDesc();
        int nextNumericPart;
        if (lastCustomer != null) {
            String lastCode = lastCustomer.getCode();
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
        id = prefix + String.format("%03d", nextNumericPart);

        return id;
    }
}
