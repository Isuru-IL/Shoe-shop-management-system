package lk.ijse.gdse.shoeshopbackend.auth.response;

import lk.ijse.gdse.shoeshopbackend.util.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JwtAuthResponse {
    private String token;
    private Role role;
}
