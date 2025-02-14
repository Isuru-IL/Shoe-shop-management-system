package lk.ijse.gdse.shoeshopbackend.service.impl;

import lk.ijse.gdse.shoeshopbackend.auth.request.SignInRequest;
import lk.ijse.gdse.shoeshopbackend.auth.request.SignUpRequest;
import lk.ijse.gdse.shoeshopbackend.auth.response.JwtAuthResponse;
import lk.ijse.gdse.shoeshopbackend.dto.UserDTO;
import lk.ijse.gdse.shoeshopbackend.entity.Customer;
import lk.ijse.gdse.shoeshopbackend.entity.User;
import lk.ijse.gdse.shoeshopbackend.repository.CustomerRepo;
import lk.ijse.gdse.shoeshopbackend.repository.EmployeeRepo;
import lk.ijse.gdse.shoeshopbackend.repository.UserRepo;
import lk.ijse.gdse.shoeshopbackend.service.AuthenticationService;
import lk.ijse.gdse.shoeshopbackend.service.JwtService;
import lk.ijse.gdse.shoeshopbackend.service.exception.DuplicateRecordException;
import lk.ijse.gdse.shoeshopbackend.service.exception.IncorrectPasswordException;
import lk.ijse.gdse.shoeshopbackend.service.exception.NotFoundException;
import lk.ijse.gdse.shoeshopbackend.util.EmailUtil;
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

import javax.mail.MessagingException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

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
    private final CustomerRepo customerRepo;

    private final Path stateFilePath = Paths.get("task-state.txt");


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

    /*Email*/
    @Override
    public List<String> sendWishes() {
        List<String> custStringList = new ArrayList<>();
        if (!isTaskExecutedToday()) {
            List<Customer> customersByBirthdayToday = customerRepo.findCustomersByBirthdayToday();
            //System.out.println("send wishes");
            customersByBirthdayToday.forEach(customer -> {
                try {
                    EmailUtil.sendEmail(customer.getEmail(), "Happy Birthday!", "Happy Birthday " + customer.getName() + "!");
                } catch (MessagingException e) {
                    throw new RuntimeException(e);
                }finally {
                    String custCode = customer.getCode();
                    String name = customer.getName();
                    String together = custCode + " - " + name;
                    custStringList.add(together);
                    saveLastExecutionDate(new Date());
                }
            });
            return custStringList;
        }else{
            return custStringList;
        }
    }

    private boolean isTaskExecutedToday() {
        try {
            if (Files.exists(stateFilePath)) {
                System.out.println("exists");
                String lastExecutionDateStr = Files.readString(stateFilePath).trim();
                if(lastExecutionDateStr.isEmpty() || !lastExecutionDateStr.matches("-?\\d+")) {
                    return false;
                }
                Date lastExecutionDate = new Date(Long.parseLong(lastExecutionDateStr));
                Calendar currentCal = Calendar.getInstance();
                Calendar lastExecutionCal = Calendar.getInstance();
                lastExecutionCal.setTime(lastExecutionDate);
                return currentCal.get(Calendar.YEAR) == lastExecutionCal.get(Calendar.YEAR) &&
                        currentCal.get(Calendar.DAY_OF_YEAR) == lastExecutionCal.get(Calendar.DAY_OF_YEAR);
            }else {
                System.out.println("doesn't exist");
                Files.createFile(stateFilePath);
                Calendar yesterdayCal = Calendar.getInstance();
                yesterdayCal.add(Calendar.DAY_OF_MONTH, -1);
                Date yesterdayDate = yesterdayCal.getTime();
                saveLastExecutionDate(yesterdayDate);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return false;
    }

    private void saveLastExecutionDate(Date executionDate) {
        try {
            Files.writeString(stateFilePath, String.valueOf(executionDate.getTime()));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
