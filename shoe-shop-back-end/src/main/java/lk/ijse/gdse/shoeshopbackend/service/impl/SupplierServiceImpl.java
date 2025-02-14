package lk.ijse.gdse.shoeshopbackend.service.impl;

import lk.ijse.gdse.shoeshopbackend.dto.CustomerDTO;
import lk.ijse.gdse.shoeshopbackend.dto.SupplierDTO;
import lk.ijse.gdse.shoeshopbackend.entity.Customer;
import lk.ijse.gdse.shoeshopbackend.entity.Supplier;
import lk.ijse.gdse.shoeshopbackend.repository.SupplierRepo;
import lk.ijse.gdse.shoeshopbackend.service.SupplierService;
import lk.ijse.gdse.shoeshopbackend.service.exception.DuplicateRecordException;
import lk.ijse.gdse.shoeshopbackend.service.exception.NotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SupplierServiceImpl implements SupplierService {

    @Autowired
    private SupplierRepo supplierRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public SupplierDTO saveSupplier(SupplierDTO supplierDTO) {
        if (supplierRepo.existsById(supplierDTO.getCode())){
            throw new DuplicateRecordException("Supplier Id is already exists!");
        }
        return mapper.map(supplierRepo.save(mapper.map(supplierDTO, Supplier.class)), SupplierDTO.class);
    }

    @Override
    public SupplierDTO updateSupplier(SupplierDTO supplierDTO) {
        if (!supplierRepo.existsById(supplierDTO.getCode())){
            throw new NotFoundException("Supplier Id does not exists!");
        }

        return mapper.map(supplierRepo.save(mapper.map(supplierDTO, Supplier.class)), SupplierDTO.class);
    }

    @Override
    public boolean deleteSupplier(String id) {
        if (!supplierRepo.existsById(id)) {
            return false;
        }
        supplierRepo.deleteById(id);
        return !supplierRepo.existsById(id);
    }

    @Override
    public List<SupplierDTO> getAllSupplier() {
        return supplierRepo.findAll().stream().map(supplier -> mapper.map(supplier,SupplierDTO.class)).toList();
    }

    @Override
    public List<SupplierDTO> searchSupplier(String name) {
        List<SupplierDTO> list = supplierRepo.findByName(name).stream().map(supplier -> mapper.map(supplier, SupplierDTO.class)).toList();
        return list;
    }

    @Override
    public SupplierDTO searchSupplierById(String id) {
        if (!supplierRepo.existsById(id)){
            throw new NotFoundException("Supplier Id does not exists!");
        }
//        return customerRepo.findById(id).map(customer -> mapper.map(customer, CustomerDTO.class)).get();
        Supplier supplier = supplierRepo.findByCode(id);
        return mapper.map(supplier,SupplierDTO.class);
    }

    @Override
    public String generateNextId() {
        String prefix = "S";
        String id = "";

        Supplier lastSupplier = supplierRepo.findTopByOrderByCodeDesc();
        int nextNumericPart;
        if (lastSupplier != null) {
            String lastCode = lastSupplier.getCode();
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

        return id;
    }
}
