function customerInitialize() {
    getAllCustomers();
    loadNextCustomerId();
}
loadNextCustomerId();

function getAllCustomers() {

    $.ajax({
        url: "http://localhost:8080/api/v1/customer/getAllCustomers",
        method: "GET",
        dataType: "json",
        success: function (resp) {
            loadCustomerDataToTable(resp);
        },
        error: function (xhr, status, error) {
            console.log("getAllCustomer = "+error)
        }
    })
}

function loadCustomerDataToTable(resp) {
    $("#tbody-customer").empty();
    $.each(resp, function (index, customer) {
        let newGender = customerCapitalizeFirstLetter(customer.gender)


        if (customer.recentPurchaseDate===null){
            customer.recentPurchaseDate="No Purchases Yet";
        }
        let row = `<tr>
                                <th>${customer.code}</th>
                                <td>${customer.name}</td>
                                <td>${customer.email}</td>
                                <td>${customer.dob}</td>
                                <td>${customer.contact}</td>
                                <td>${customer.addressLine1} ${customer.addressLine2}</td>
                                <td>${newGender}</td>
                                <td>${customer.loyaltyDate}</td>
                                <td>${customer.loyaltyLevel}</td>
                                <td>${customer.loyaltyPoints}</td>
                                <td>${customer.recentPurchaseDate}</td>
                                <td style="display: none">${customer.addressLine1}</td>
                                <td style="display: none">${customer.addressLine2}</td>
                              </tr>`;
        $("#tbody-customer").append(row);
    })
}

function loadNextCustomerId() {
    $.ajax({
        url:"http://localhost:8080/api/v1/customer/nextId",
        method:"GET",
        success:function (resp) {
            $("#txtCusCode").val(resp);
        },
        error:function (xhr, status, error) {
            console.log("loadNextCustomerId() ="+error)
        }
    })
}

$("#btnCustomerClear").click(function (){
    clearCusInputFields()
})

/*save customer*/
$("#btnCustomerSave").click(function () {
    if (checkAllCustomers()) {
        if (checkCusEmptyInputFields()){
            saveCustomer();
        }
    } else {
        swal("Error", "Please check the input fields!", "error");
    }
})
function saveCustomer() {
    let id = $("#txtCusCode").val();
    let name = $("#txtCusName").val();
    let email = $("#txtCusEmail").val();
    let dob = $("#txtCusDob").val();
    let contact = $("#txtCusContact").val();
    let addLine01 = $("#txtCusAddLine01").val();
    let addLine02 = $("#txtCusAddLine02").val();
    let gender = $("#cmbCusGender").val();
    let loyaltyDate = $("#txtCusLoyaltyDate").val();

    /*console.log(id)
    console.log(name)
    console.log(email)
    console.log(dob)
    console.log(contact)
    console.log(addLine01)
    console.log(addLine02)
    console.log(gender)
    console.log(loyaltyDate)*/


    const customerObj = {
        code:id,
        name:name,
        email:email,
        dob:dob,
        contact:contact,
        addressLine1:addLine01,
        addressLine2:addLine02,
        gender:gender.toUpperCase(),
        loyaltyDate:loyaltyDate,
        loyaltyLevel:"NEW",
        loyaltyPoints:0
    };

    const jsonObj = JSON.stringify(customerObj);

    $.ajax({
        url: "http://localhost:8080/api/v1/customer/save",
        method: "POST",
        data: jsonObj,
        contentType: "application/json",
        success: function (resp, textStatus, jqxhr) {
            //console.log("customer save success: ", resp);
            clearCusInputFields()
            swal("Saved", "Customer saved successfully!", "success");
            /*$("#btnCustomerSave").prop("disabled", true);
            $("#btnCustomerUpdate").prop("disabled", true);
            $("#btnCustomerDelete").prop("disabled", true);*/
        },
        error: function (xhr, textStatus, error) {
            console.log("cSave error: ", error);
            console.log("cSave error: ", xhr.status);
            if (xhr.status===409){
                swal("Error", "This customer is already exits!", "error");
            }
        }
    })
}

/*update customer*/
$("#btnCustomerUpdate").click(function () {
    if (checkAllCustomers()) {
        if (checkCusEmptyInputFields()){
            updateCustomer();
        }
    } else {
        swal("Error", "Please check the input fields!", "error");
    }
})
function updateCustomer() {
    let id = $("#txtCusCode").val();
    let name = $("#txtCusName").val();
    let email = $("#txtCusEmail").val();
    let dob = $("#txtCusDob").val();
    let contact = $("#txtCusContact").val();
    let addLine01 = $("#txtCusAddLine01").val();
    let addLine02 = $("#txtCusAddLine02").val();
    let gender = $("#cmbCusGender").val();
    let loyaltyDate = $("#txtCusLoyaltyDate").val();

    const customerObj = {
        code:id,
        name:name,
        email:email,
        dob:dob,
        contact:contact,
        addressLine1:addLine01,
        addressLine2:addLine02,
        gender:gender.toUpperCase(),
        loyaltyDate:loyaltyDate
        //loyaltyLevel:"NEW",
        //loyaltyPoints:0
    };

    const jsonObj = JSON.stringify(customerObj);

    $.ajax({
        url: "http://localhost:8080/api/v1/customer/update",
        method: "PATCH",
        data: jsonObj,
        contentType: "application/json",
        success: function (resp, textStatus, jqxhr) {
            //console.log("customer save success: ", resp);
            clearCusInputFields()
            swal("Updated", "Customer updated successfully!", "success");
            /*$("#btnCustomerSave").prop("disabled", true);
            $("#btnCustomerUpdate").prop("disabled", true);
            $("#btnCustomerDelete").prop("disabled", true);*/
        },
        error: function (xhr, textStatus, error) {
            console.log("cUpdate error: ", error);
            console.log("cUpdate error: ", xhr.status);
            if (xhr.status===404){
                swal("Error", "This customer does not exits!", "error");
            }
        }
    })
}

/*delete customer*/
$("#btnCustomerDelete").click(function () {
    let code = $("#txtCusCode").val();
    if (code === ""){
        swal("Error", "Please input valid Customer ID!", "error");
        return;
    }
    deleteCustomer(code);
})
function deleteCustomer(code) {
    $.ajax({
        url: "http://localhost:8080/api/v1/customer/delete?code="+code,
        method: "DELETE",
        dataType: "json",
        success: function (resp) {
            console.log("resp = "+resp)
            if (resp){
                swal("Deleted", "Customer deleted successfully!", "success");
                clearCusInputFields();
                return;
            }
            swal("Error", "This customer does not exits!", "error");
        },
        error: function (xhr, status, error) {
            console.log("cusSearchByName = "+error)
        }
    })
}


$("#btnCustomerSearch").click(function () {
    let searchValue = $("#txtCustomerSearch").val()
    if (searchValue===""){
        swal("Error", "Please input Customer ID or Customer name!", "error");
        return;
    }
    let searchType = $("#cmbCustomerSearch").val();

    if (searchType === "ID"){
        cusSearchById(searchValue);
    } else if(searchType === "Name"){
        cusSearchByName(searchValue);
    }
})

function cusSearchById(code) {
    $.ajax({
        url: "http://localhost:8080/api/v1/customer/searchById?code="+code,
        method: "GET",
        dataType: "json",
        success: function (resp) {
            loadCustomerDataToTableById(resp);
        },
        error: function (xhr, textStatus, error) {
            console.log("cusSearchById error: ", error);
            console.log("cusSearchById error: ", xhr.status);
            if (xhr.status===404){
                swal("Error", "This customer does not exits!", "error");
            }
        }
    })
}
function loadCustomerDataToTableById(customer) {
    $("#tbody-customer").empty();
    let newGender = customerCapitalizeFirstLetter(customer.gender)
    if (customer.recentPurchaseDate===null){
        customer.recentPurchaseDate="No Purchases Yet";
    }
    let row = `<tr>
                                <th>${customer.code}</th>
                                <td>${customer.name}</td>
                                <td>${customer.email}</td>
                                <td>${customer.dob}</td>
                                <td>${customer.contact}</td>
                                <td>${customer.addressLine1} ${customer.addressLine2}</td>
                                <td>${newGender}</td>
                                <td>${customer.loyaltyDate}</td>
                                <td>${customer.loyaltyLevel}</td>
                                <td>${customer.loyaltyPoints}</td>
                                <td>${customer.recentPurchaseDate}</td>
                                <td style="display: none">${customer.addressLine1}</td>
                                <td style="display: none">${customer.addressLine2}</td>
                              </tr>`;
    $("#tbody-customer").append(row);
}

function cusSearchByName(name) {
    $.ajax({
        url: "http://localhost:8080/api/v1/customer/searchByName?name="+name,
        method: "GET",
        dataType: "json",
        success: function (resp) {
            if (resp.length === 0){
                swal("Error", "Customer Name not found!", "error");
                return;
            }
            loadCustomerDataToTable(resp);
        },
        error: function (xhr, status, error) {
            console.log("cusSearchByName = "+error)
        }
    })
}

$("#tbody-customer").on('click', 'tr', function (){
    let row = $(this)

    var id = row.children().eq(0).text();
    var name = row.children().eq(1).text();
    var email = row.children().eq(2).text();
    var dob = row.children().eq(3).text();
    var contact = row.children().eq(4).text();
    var gender = row.children().eq(6).text();
    var loyaltyDate = row.children().eq(7).text();
    var addLine01 = row.children().eq(11).text();
    var addLine02 = row.children().eq(12).text();

    /*$("#btnCustomerSave").prop("disabled", true);*/

    $("#txtCusCode").val(id)
    $("#txtCusName").val(name);
    $("#txtCusEmail").val(email);
    $("#txtCusDob").val(dob);
    $("#txtCusContact").val(contact);
    $("#txtCusAddLine01").val(addLine01);
    $("#txtCusAddLine02").val(addLine02);
    $("#cmbCusGender").val(gender);
    $("#txtCusLoyaltyDate").val(loyaltyDate);
})

function clearCusInputFields() {
    $("#txtCusName").val("");
    $("#txtCusEmail").val("");
    $("#txtCusDob").val("");
    $("#txtCusContact").val("");
    $("#txtCusAddLine01").val("");
    $("#txtCusAddLine02").val("");
    $("#cmbCusGender").prop("selectedIndex", "Male");
    $("#txtCusLoyaltyDate").val("");

    $("#txtCustomerSearch").val("");

    $("#txtCusName,#txtCusEmail,#txtCusContact,#txtCusAddLine01,#txtCusAddLine02").css("border", "1px solid #ced4da");
    setCustomerBtn();
    loadNextCustomerId();
    getAllCustomers();
}
function customerCapitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function checkCusEmptyInputFields() {
    if ($("#txtCusDob").val()==="" || $("#txtCusLoyaltyDate").val()===""){
        swal("Error", "Fill all empty the fields!", "error");
        return false;
    }
    return true
}