package lk.ijse.gdse.shoeshopbackend.service.impl;

import lk.ijse.gdse.shoeshopbackend.auth.request.SignInRequest;
import lk.ijse.gdse.shoeshopbackend.auth.request.SignUpRequest;
import lk.ijse.gdse.shoeshopbackend.auth.response.JwtAuthResponse;
import lk.ijse.gdse.shoeshopbackend.dto.UserDTO;
import lk.ijse.gdse.shoeshopbackend.entity.User;
import lk.ijse.gdse.shoeshopbackend.repository.EmployeeRepo;
import lk.ijse.gdse.shoeshopbackend.repository.UserRepo;
import lk.ijse.gdse.shoeshopbackend.service.AuthenticationService;
import lk.ijse.gdse.shoeshopbackend.service.JwtService;
import lk.ijse.gdse.shoeshopbackend.service.exception.DuplicateRecordException;
import lk.ijse.gdse.shoeshopbackend.service.exception.IncorrectPasswordException;
import lk.ijse.gdse.shoeshopbackend.service.exception.NotFoundException;
import lk.ijse.gdse.shoeshopbackend.util.Role;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthenticationServiceImpl implements AuthenticationService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepo userRepo;
    private final ModelMapper mapper;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final EmployeeRepo employeeRepo;


    @Override
    public JwtAuthResponse signIn(SignInRequest signInRequest) {
        if (!userRepo.existsById(signInRequest.getEmail())){
            log.error("User email not found!");
            throw new NotFoundException("User email not found");
        }

        User userByEmail = userRepo.getAllByEmail(signInRequest.getEmail());
        if (!passwordEncoder.matches(signInRequest.getPassword(), userByEmail.getPassword())){
            log.error("Incorrect password!");
            throw new IncorrectPasswordException("Incorrect password");
        }

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signInRequest.getEmail(), signInRequest.getPassword()));
        User user = userRepo.findByEmail(signInRequest.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("user not found"));
        String generatedToken = jwtService.generateToken(user);
        return JwtAuthResponse.builder()
                .token(generatedToken)
                .role(user.getRole())
                .build();
    }

    @Override
    public JwtAuthResponse signUp(SignUpRequest signUpRequest) {
        String email = signUpRequest.getEmail();

        if (userRepo.existsById(email)) {
            log.error("User Email already exists!");
            throw new DuplicateRecordException("User Email already exists!");
        }

        if (!employeeRepo.existsByEmail(email)) {
            log.error("No Employee can be found with this email!");
            throw new NotFoundException("No Employee can be found with this email");
        }

        UserDTO userDTO = UserDTO.builder()
                .email(signUpRequest.getEmail())
                .firstName(signUpRequest.getFirstName())
                .lastName(signUpRequest.getLastName())
                .password(passwordEncoder.encode(signUpRequest.getPassword()))
                .role(Role.valueOf(signUpRequest.getRole()))
                .build();
        User savedUser = userRepo.save(mapper.map(userDTO, User.class));
        String generatedToken = jwtService.generateToken(savedUser);
        return JwtAuthResponse.builder().token(generatedToken).build();
    }
}
