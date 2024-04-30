package lk.ijse.gdse.shoeshopbackend.dto;

import lk.ijse.gdse.shoeshopbackend.util.Gender;
import lk.ijse.gdse.shoeshopbackend.util.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class EmployeeDTO {
    private String code;
    private String name;
    private Gender gender;
    private String civilStatus;
    private String designation;
    private Role role;
    private Date dob;
    private Date joinDate;
    private String branch;
    private String addressLine1;
    private String addressLine2;
    private String contact;
    private String email;
    private String guardianName;
    private String emergencyContact;
    private String proPic;
}
