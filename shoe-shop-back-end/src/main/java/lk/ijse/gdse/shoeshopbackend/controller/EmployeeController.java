package lk.ijse.gdse.shoeshopbackend.controller;

import lk.ijse.gdse.shoeshopbackend.dto.CustomerDTO;
import lk.ijse.gdse.shoeshopbackend.dto.EmployeeDTO;
import lk.ijse.gdse.shoeshopbackend.service.EmployeeService;
import lk.ijse.gdse.shoeshopbackend.util.Gender;
import lk.ijse.gdse.shoeshopbackend.util.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("api/v1/employee")
@CrossOrigin(origins = "*")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping("/getAllEmployees")
    public List<EmployeeDTO> getAllEmployees(){
        return employeeService.getAllEmployee();
    }

    @PostMapping(value = "/save",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public EmployeeDTO save(@RequestParam("code") String code,
                            @RequestParam("name") String name,
                            @RequestParam("gender") Gender gender,
                            @RequestParam("civilStatus") String civilStatus,
                            @RequestParam("designation") String designation,
                            @RequestParam("role") Role role,
                            @RequestParam("dob") String dob,
                            @RequestParam("joinDate") String joinDate,
                            @RequestParam("branch") String branch,
                            @RequestParam("addressLine1") String addressLine1,
                            @RequestParam("addressLine2") String addressLine2,
                            @RequestParam("contact") String contact,
                            @RequestParam("email") String email,
                            @RequestParam("guardianName") String guardianName,
                            @RequestParam("emergencyContact") String emergencyContact,
                            @RequestParam("proPic") MultipartFile proPic
                            ) throws ParseException, IOException {

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date newDob = dateFormat.parse(dob);
        Date newJoinDate = dateFormat.parse(joinDate);

        String image = Base64.getEncoder().encodeToString(proPic.getBytes());

        EmployeeDTO employeeDTO = new EmployeeDTO(code,name,gender,civilStatus,designation,role,newDob,newJoinDate,
                branch,addressLine1,addressLine2,contact,email,guardianName,emergencyContact,image);

        //System.out.println(employeeDTO);
        return employeeService.saveEmployee(employeeDTO);
    }

    @PatchMapping (value = "/update",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public EmployeeDTO update(@RequestParam("code") String code,
                              @RequestParam("name") String name,
                              @RequestParam("gender") Gender gender,
                              @RequestParam("civilStatus") String civilStatus,
                              @RequestParam("designation") String designation,
                              @RequestParam("role") Role role,
                              @RequestParam("dob") String dob,
                              @RequestParam("joinDate") String joinDate,
                              @RequestParam("branch") String branch,
                              @RequestParam("addressLine1") String addressLine1,
                              @RequestParam("addressLine2") String addressLine2,
                              @RequestParam("contact") String contact,
                              @RequestParam("email") String email,
                              @RequestParam("guardianName") String guardianName,
                              @RequestParam("emergencyContact") String emergencyContact,
                              @RequestParam("proPic") MultipartFile proPic
                                ) throws ParseException, IOException {

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date newDob = dateFormat.parse(dob);
        Date newJoinDate = dateFormat.parse(joinDate);

        String image = Base64.getEncoder().encodeToString(proPic.getBytes());

        EmployeeDTO employeeDTO = new EmployeeDTO(code,name,gender,civilStatus,designation,role,newDob,newJoinDate,
                branch,addressLine1,addressLine2,contact,email,guardianName,emergencyContact,image);

        return employeeService.updateEmployee(employeeDTO);

    }

    @DeleteMapping("/delete")
    public boolean delete(@RequestParam("code") String code){
        return employeeService.deleteEmployee(code);
    }


    @GetMapping("/searchById")
    public EmployeeDTO searchByID(@RequestParam("code")String code){
        return employeeService.searchEmployeeById(code);
    }

    @GetMapping("/nextId")
    public String nextId(){
        return employeeService.generateNextId();
    }

    @GetMapping("/searchByEmail")
    public EmployeeDTO searchByEmail(@RequestParam("email")String email){
        return employeeService.searchByEmail(email);
    }

}
