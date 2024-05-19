package lk.ijse.gdse.shoeshopbackend.service;

import lk.ijse.gdse.shoeshopbackend.dto.UserDTO;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService {
    UserDetailsService userDetailService();
    void Save(UserDTO userDTO);
}
