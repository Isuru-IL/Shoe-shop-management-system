package lk.ijse.gdse.shoeshopbackend.service.impl;

import lk.ijse.gdse.shoeshopbackend.dto.CustomerDTO;
import lk.ijse.gdse.shoeshopbackend.dto.UserDTO;
import lk.ijse.gdse.shoeshopbackend.entity.Customer;
import lk.ijse.gdse.shoeshopbackend.entity.User;
import lk.ijse.gdse.shoeshopbackend.repository.EmployeeRepo;
import lk.ijse.gdse.shoeshopbackend.repository.UserRepo;
import lk.ijse.gdse.shoeshopbackend.service.UserService;
import lk.ijse.gdse.shoeshopbackend.service.exception.DuplicateRecordException;
import lk.ijse.gdse.shoeshopbackend.service.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepo userRepo;
    private final EmployeeRepo employeeRepo;
    private final ModelMapper mapper;

    @Override
    public UserDetailsService userDetailService() {
        return username -> userRepo.findByEmail(username)
                .orElseThrow(() -> new
                        UsernameNotFoundException(
                        "user not found"));
    }

    @Override
    public void Save(UserDTO userDTO) {
        if (userRepo.existsById(userDTO.getEmail())){
            throw new DuplicateRecordException("User Email is already exists!");
        } else if (!employeeRepo.existsByEmail(userDTO.getEmail())) {
            throw new NotFoundException("No Employee can be found this email");
        } else {
            userRepo.save(mapper.map(userDTO, User.class));
        }
    }
}
