function employeeInitialize() {
    getAllEmployee();
    loadNextEmployeeId();
}
getAllEmployee();
loadNextCustomerId();

/*save employee*/
$("#btnEmpSave").click(function () {
    if (checkAllEmployees()) {
        if (checkEmpEmptyInputFields()){
            saveEmployee();
        }
    } else {
        swal("Error", "Please check the input fields!", "error");
    }
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
    /*console.log("proPic = "+proPic);*/

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
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (resp, textStatus, jqxhr) {
            //console.log("customer save success: ", resp);
            clearEmpInputFields()
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


$("#btnEmpUpdate").click(function () {
    if (checkAllEmployees()) {
        if (checkEmpEmptyInputFields()){
            updateEmployee();
        }
    } else {
        swal("Error", "Please check the input fields!", "error");
    }
})
function updateEmployee() {
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
    // formData.append('proPic',proPic);

    let proPicInput = $('#txtEmpProfilePic')[0];
    if (proPicInput.files.length > 0) {
        formData.append('proPic', proPicInput.files[0]);
    }
    console.log("proPic = "+proPicInput);

    console.log(formData)

    $.ajax({
        url: "http://localhost:8080/api/v1/employee/update",
        method: "PATCH",
        processData: false,
        contentType: false,
        data: formData,
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (resp, textStatus, jqxhr) {
            //console.log("customer save success: ", resp);
            clearEmpInputFields()
            swal("Update", "Employee updated successfully!", "success");
            /*$("#btnCustomerSave").prop("disabled", true);
            $("#btnCustomerUpdate").prop("disabled", true);
            $("#btnCustomerDelete").prop("disabled", true);*/
        },
        error: function (xhr, textStatus, error) {
            console.log("eSave error: ", error);
            console.log("eSave error: ", xhr.status);
            if (xhr.status === 404) {
                swal('Error', 'This employee does not exist!', 'error');
            } else {
                swal('Error', 'Failed to update employee.', 'error');
            }
        }
    })
}


$("#btnEmpDelete").click(function () {
    let code = $("#txtEmpCode").val();
    if (code === "") {
        swal("Error", "Please input valid Employee ID!", "error");
        return;
    }
    deleteEmployee(code);
})
function deleteEmployee(code) {
    $.ajax({
        url: "http://localhost:8080/api/v1/employee/delete?code="+code,
        method: "DELETE",
        dataType: "json",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (resp) {
            console.log("resp = "+resp)
            if (resp){
                swal("Deleted", "Employee deleted successfully!", "success");
                clearEmpInputFields();
                return;
            }
            swal("Error", "This employee does not exits!", "error");
        },
        error: function (xhr, status, error) {
            console.log("empDelete = "+error)
        }
    })
}

function getAllEmployee() {
    $.ajax({
        url: "http://localhost:8080/api/v1/employee/getAllEmployees",
        method: "GET",
        dataType: "json",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (resp) {
            loadEmployeeDataToTable(resp);
        },
        error: function (xhr, status, error) {
            console.log("getAllCustomer = "+error)
        }
    })
}

$("#tbody-employee").on('click', 'tr', function (){
    let row = $(this)

    var code = row.children().eq(0).text();
    var proPic = row.children().eq(1).html();
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

    //console.log(proPic)

    /*$("#btnCustomerSave").prop("disabled", true);*/

    var base64Data;
    var matches = proPic.match(/src="data:image\/png;base64,([^"]+)"/);
    if (matches) {
        base64Data = matches[1];
        //console.log(base64Data);

        // Decode base64 data into a blob
        var byteCharacters = atob(base64Data);
        var byteNumbers = new Array(byteCharacters.length);
        for (var i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        var blob = new Blob([byteArray], { type: 'image/png' });

        // Create a file from the blob
        var file = new File([blob], 'image.png', { type: 'image/png' });
        console.log(file)

        var dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);

        // Set the files property of the file chooser input field using the files property of the DataTransfer object
        var fileInput = document.getElementById('txtEmpProfilePic');
        fileInput.files = dataTransfer.files;

    } else {
        console.log("No image data found in the table cell.");
    }

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

    empProPicSearchById(code);
})


function setEmpImage(resp) {
    $("#employee-pro-pic-div").empty();
    var proPic = resp.proPic;
    //console.log("table click = "+proPic)

    var imageElement = `<img alt="image" src="data:image/png;base64,${proPic}" style="max-width: 100px; height: auto; padding: 0; border-radius: 1.4em;">`
    $("#employee-pro-pic-div").append(imageElement);
}

$("#btnEmpSearch").click(function () {
    let searchValue = $("#txtEmpSearch").val()
    if (searchValue===""){
        swal("Error", "Please input Employee ID!", "error");
        return;
    }
    empSearchById(searchValue);
})

function empSearchById(code) {
    $.ajax({
        url: "http://localhost:8080/api/v1/employee/searchById?code="+code,
        method: "GET",
        dataType: "json",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (resp) {
            //console.log(resp)
            setEmpImage(resp);
            loadEmployeeDataToTableById(resp);
        },
        error: function (xhr, textStatus, error) {
            console.log("empSearchById error: ", error);
            console.log("empSearchById error: ", xhr.status);
            if (xhr.status===404){
                swal("Error", "This employee does not exits!", "error");
            }
        }
    })
}

function empProPicSearchById(code) {
    $.ajax({
        url: "http://localhost:8080/api/v1/employee/searchById?code="+code,
        method: "GET",
        dataType: "json",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (resp) {
            setEmpImage(resp);
        },
        error: function (xhr, textStatus, error) {
            console.log("empSearchById error: ", error);
            console.log("empSearchById error: ", xhr.status);
            if (xhr.status===404){
                swal("Error", "This employee does not exits!", "error");
            }
        }
    })
}

function loadNextEmployeeId() {
    $.ajax({
        url:"http://localhost:8080/api/v1/employee/nextId",
        method:"GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success:function (resp) {
            $("#txtEmpCode").val(resp);
        },
        error:function (xhr, status, error) {
            console.log("loadNextEmployeeId() ="+error)
        }
    })
}

$('#txtEmpProfilePic').on('change', function(event) {
    if ($('#txtEmpProfilePic').val() !== ""){
        $("#employee-pro-pic-div").empty();
        var file = $(this).prop('files')[0];
        var reader = new FileReader();

        reader.onload = function(e) {
            var imageElement = `<img alt="image" src="${e.target.result}" style="max-width: 100px; height: auto; padding: 0; border-radius: 1.4em;">`;
            $("#employee-pro-pic-div").append(imageElement);
        };

        reader.readAsDataURL(file);
    }
    $("#employee-pro-pic-div").empty();
});

$("#btnEmpClear").click(function (){
    clearEmpInputFields();
})

function loadEmployeeDataToTableById(employee) {
    $("#tbody-employee").empty();
    let newGender = employeeCapitalizeFirstLetter(employee.gender)
    let newRole = employeeCapitalizeFirstLetter(employee.role)

    //console.log("proPic = "+employee.proPic)
    let row = `<tr style="vertical-align: middle;">
                                <th>${employee.code}</th>
                                <td><img alt="image" src="data:image/png;base64,${employee.proPic}" style="max-width: 50px; height: 50px; border-radius: 10px;"></td>
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
}

function loadEmployeeDataToTable(resp) {
    $("#tbody-employee").empty();
    $.each(resp, function (index, employee) {
        let newGender = employeeCapitalizeFirstLetter(employee.gender)
        let newRole = employeeCapitalizeFirstLetter(employee.role)

        //console.log("proPic = "+employee.proPic)
        let row = `<tr style="vertical-align: middle;">
                                <th>${employee.code}</th>
                                <td><img alt="image" src="data:image/png;base64,${employee.proPic}" style="max-width: 50px; height: 50px; border-radius: 10px;"></td>
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

function clearEmpInputFields() {
    $("#txtEmpName").val("");
    $("#cmbEmpGender").prop("selectedIndex", "Male");
    $("#cmbEmpCivilStatus").prop("selectedIndex", "Cashier");
    $("#cmbEmpDesignation").prop("selectedIndex", "Cashier");
    $("#cmbEmpAccessRole").prop("selectedIndex", "User");
    $("#txtEmpDob").val("");
    $("#txtEmpDateOfJoin").val("");
    $("#cmbEmpBranch").prop("selectedIndex", "Galle");
    $("#txtEmpAddLine01").val("");
    $("#txtEmpAddLine02").val("");
    $("#txtEmpContact").val("");
    $("#txtEmpEmail").val("");
    $("#txtEmpGuardianName").val("");
    $("#txtEmpEmgContact").val("");
    $('#txtEmpProfilePic').val("");

    $("#employee-pro-pic-div").empty();

    $("#txtEmpSearch").val("");

    //$("#txtCusName,#txtCusEmail,#txtCusContact,#txtCusAddLine01,#txtCusAddLine02").css("border", "1px solid #ced4da");
    //setCustomerBtn();
    loadNextEmployeeId();
    getAllEmployee();
}

function employeeCapitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function checkEmpEmptyInputFields() {
    if ($("#txtEmpDob").val()==="" || $("#txtEmpDateOfJoin").val()==="" || $("#cmbEmpGender").val()===""
        || $("#cmbEmpCivilStatus").val()===""|| $("#cmbEmpDesignation").val()===""|| $("#cmbEmpAccessRole").val()===""
        || $("#cmbEmpBranch").val()===""|| $("#txtEmpProfilePic").val()===""){
        swal("Error", "Fill all empty the fields!", "error");
        return false;
    }
    return true
}