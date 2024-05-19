package lk.ijse.gdse.shoeshopbackend.dto;

import lk.ijse.gdse.shoeshopbackend.util.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {
    private String email;
    private String firstName;
    private String lastName;
    private String password;
    private Role role;
}
