function employeeInitialize() {
    getAllEmployee();
    loadNextEmployeeId();
}
getAllEmployee();
loadNextCustomerId();


/*save employee*/
$("#btnEmpSave").click(function () {
    saveEmployee();
})
function saveEmployee() {
    let code = $("#txtEmpCode").val();
    let name = $("#txtEmpName").val();
    let gender = $("#cmbEmpGender").val();
    let civilStatus = $("#cmbEmpCivilStatus").val();
    let designation = $("#cmbEmpDesignation").val();
    let role = $("#cmbEmpAccessRole").val();
    let dob = $("#txtEmpDob").val();
    let joinDate = $("#txtEmpDateOfJoin").val();
    let branch = $("#cmbEmpBranch").val();
    let addressLine1 = $("#txtEmpAddLine01").val();
    let addressLine2 = $("#txtEmpAddLine02").val();
    let contact = $("#txtEmpContact").val();
    let email = $("#txtEmpEmail").val();
    let guardianName = $("#txtEmpGuardianName").val();
    let emergencyContact = $("#txtEmpEmgContact").val();
    let proPic = $("#txtEmpProfilePic").prop('files')[0];
    console.log("proPic = "+proPic);

    var formData = new FormData();
    formData.append('code',code);
    formData.append('name',name);
    formData.append('gender',gender.toUpperCase());
    formData.append('civilStatus',civilStatus);
    formData.append('designation',designation);
    formData.append('role',role.toUpperCase());
    formData.append('dob',dob);
    formData.append('joinDate',joinDate);
    formData.append('branch',branch);
    formData.append('addressLine1',addressLine1);
    formData.append('addressLine2',addressLine2);
    formData.append('contact',contact);
    formData.append('email',email);
    formData.append('guardianName',guardianName);
    formData.append('emergencyContact',emergencyContact);
    formData.append('proPic',proPic);

    console.log(formData)

    $.ajax({
        url: "http://localhost:8080/api/v1/employee/save",
        method: "POST",
        processData: false,
        contentType: false,
        data: formData,
        success: function (resp, textStatus, jqxhr) {
            //console.log("customer save success: ", resp);
            //clearCusInputFields()
            swal("Saved", "Employee saved successfully!", "success");
            /*$("#btnCustomerSave").prop("disabled", true);
            $("#btnCustomerUpdate").prop("disabled", true);
            $("#btnCustomerDelete").prop("disabled", true);*/
        },
        error: function (xhr, textStatus, error) {
            console.log("eSave error: ", error);
            console.log("eSave error: ", xhr.status);
            if (xhr.status===409){
                swal("Error", "This employee is already exits!", "error");
            }
        }
    })
}
function getAllEmployee() {
    $.ajax({
        url: "http://localhost:8080/api/v1/employee/getAllEmployees",
        method: "GET",
        dataType: "json",
        success: function (resp) {
            loadEmployeeDataToTable(resp);
        },
        error: function (xhr, status, error) {
            console.log("getAllCustomer = "+error)
        }
    })
}

function loadEmployeeDataToTable(resp) {
    $("#tbody-employee").empty();
    $.each(resp, function (index, employee) {
        let newGender = employeeCapitalizeFirstLetter(employee.gender)
        let newRole = employeeCapitalizeFirstLetter(employee.role)

        console.log("proPic = "+employee.proPic)
        let row = `<tr>
                                <th>${employee.code}</th>
                                <td><img alt="image" src="data:image/png;base64,${employee.proPic}" style="max-width: 50px; height: auto; border-radius: 10px;"></td>
                                <td>${newRole}</td>
                                <td>${employee.name}</td>
                                <td>${employee.email}</td>
                                <td>${employee.dob}</td>
                                <td>${employee.contact}</td>
                                <td>${employee.addressLine1} ${employee.addressLine2}</td>
                                <td>${newGender}</td>
                                <td>${employee.joinDate}</td>
                                <td>${employee.civilStatus}</td>
                                <td>${employee.designation}</td>
                                <td>${employee.branch}</td>
                                <td>${employee.emergencyContact}</td>
                                <td>${employee.guardianName}</td>
                                <td style="display: none">${employee.addressLine1}</td>
                                <td style="display: none">${employee.addressLine2}</td>
                              </tr>`;
        $("#tbody-employee").append(row);

        /*var imageElement = `<img alt="image" src="data:image/png;base64,${employee.proPic}" style="max-width: 100px; height: auto; padding: 0; border-radius: 1.4em;">`
        $("#employee-pro-pic-div").append(imageElement);*/
    })
}

$("#tbody-employee").on('click', 'tr', function (){
    let row = $(this)

    var code = row.children().eq(0).text();
    var proPic = row.children().eq(1).text();
    var role = row.children().eq(2).text();
    var name = row.children().eq(3).text();
    var email = row.children().eq(4).text();
    var dob = row.children().eq(5).text();
    var contact = row.children().eq(6).text();
    var gender = row.children().eq(8).text();
    var joinDate = row.children().eq(9).text();
    var civilStatus = row.children().eq(10).text();
    var designation = row.children().eq(11).text();
    var branch = row.children().eq(12).text();
    var emergencyContact = row.children().eq(13).text();
    var guardianName = row.children().eq(14).text();
    var addressLine1 = row.children().eq(15).text();
    var addressLine2 = row.children().eq(16).text();

    /*$("#btnCustomerSave").prop("disabled", true);*/

    $("#txtEmpCode").val(code);
    $("#txtEmpName").val(name);
    $("#cmbEmpGender").val(gender);
    $("#cmbEmpCivilStatus").val(civilStatus);
    $("#cmbEmpDesignation").val(designation);
    $("#cmbEmpAccessRole").val(role);
    $("#txtEmpDob").val(dob);
    $("#txtEmpDateOfJoin").val(joinDate);
    $("#cmbEmpBranch").val(branch);
    $("#txtEmpAddLine01").val(addressLine1);
    $("#txtEmpAddLine02").val(addressLine2);
    $("#txtEmpContact").val(contact);
    $("#txtEmpEmail").val(email);
    $("#txtEmpGuardianName").val(guardianName);
    $("#txtEmpEmgContact").val(emergencyContact);

    console.log("afterProPic = "+proPic)

    var imageElement = `<img alt="image" src="data:image/png;base64,${proPic}" style="max-width: 100px; height: auto; padding: 0; border-radius: 1.4em;">`
    $("#employee-pro-pic-div").append(imageElement);
})

function loadNextEmployeeId() {
    $.ajax({
        url:"http://localhost:8080/api/v1/employee/nextId",
        method:"GET",
        success:function (resp) {
            $("#txtEmpCode").val(resp);
        },
        error:function (xhr, status, error) {
            console.log("loadNextEmployeeId() ="+error)
        }
    })
}


function employeeCapitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}