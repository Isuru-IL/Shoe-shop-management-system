function supplierInitialize() {
    getAllSuppliers();
    loadNextSupplierId();
}
loadNextSupplierId()


function getAllSuppliers() {
    $.ajax({
        url: "http://localhost:8080/api/v1/supplier/getAllSuppliers",
        method: "GET",
        dataType: "json",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (resp) {
            loadSupplierDataToTable(resp);
        },
        error: function (xhr, status, error) {
            console.log("getAllSuppliers = "+error)
        }
    })
}

$("#btnSupplierClear").click(function (){
    clearSupInputFields();
})

$("#btnSupSave").click(function () {
    if (checkAllSuppliers()) {
        if (checkSupEmptyInputFields()){
            saveSupplier();
        }
    } else {
        swal("Error", "Please check the input fields!", "error");
    }
})

function saveSupplier() {
    let code = $("#txtSupCode").val()
    let name = $("#txtSupName").val();
    let email = $("#txtSupEmail").val();
    let category = $("#cmbSupCategory").val();
    let addressLine1 = $("#txtSupAddLine01").val();
    let addressLine2 = $("#txtSupAddLine02").val();
    let mobileContact = $("#txtSupMobile").val();
    let landLineContact = $("#txtSupLandLine").val();

    /*console.log(id)
    console.log(name)
    console.log(email)
    console.log(dob)
    console.log(contact)
    console.log(addLine01)
    console.log(addLine02)
    console.log(gender)
    console.log(loyaltyDate)*/


    const supplierObj = {
        code:code,
        name:name,
        email:email,
        category:category.toUpperCase(),
        addressLine1:addressLine1,
        addressLine2:addressLine2,
        mobileContact:mobileContact,
        landLineContact:landLineContact
    };

    const jsonObj = JSON.stringify(supplierObj);

    $.ajax({
        url: "http://localhost:8080/api/v1/supplier/save",
        method: "POST",
        data: jsonObj,
        contentType: "application/json",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (resp, textStatus, jqxhr) {
            //console.log("customer save success: ", resp);
            clearSupInputFields()
            swal("Updated", "Supplier saved successfully!", "success");
            $("#btnSupSave").prop("disabled", true);
            $("#btnSupUpdate").prop("disabled", true);
            $("#btnSupDelete").prop("disabled", true);
        },
        error: function (xhr, textStatus, error) {
            console.log("cSave error: ", error);
            console.log("cSave error: ", xhr.status);
            if (xhr.status===409){
                swal("Error", "This supplier is already exits!", "error");
            }
        }
    })
}

$("#btnSupUpdate").click(function () {
    if (checkAllSuppliers()) {
        if (checkSupEmptyInputFields()){
            updateSupplier();
        }
    } else {
        swal("Error", "Please check the input fields!", "error");
    }
})

function updateSupplier() {
    let code = $("#txtSupCode").val()
    let name = $("#txtSupName").val();
    let email = $("#txtSupEmail").val();
    let category = $("#cmbSupCategory").val();
    let addressLine1 = $("#txtSupAddLine01").val();
    let addressLine2 = $("#txtSupAddLine02").val();
    let mobileContact = $("#txtSupMobile").val();
    let landLineContact = $("#txtSupLandLine").val();

    const supplierObj = {
        code:code,
        name:name,
        email:email,
        category:category.toUpperCase(),
        addressLine1:addressLine1,
        addressLine2:addressLine2,
        mobileContact:mobileContact,
        landLineContact:landLineContact
    };

    const jsonObj = JSON.stringify(supplierObj);

    $.ajax({
        url: "http://localhost:8080/api/v1/supplier/update",
        method: "PATCH",
        data: jsonObj,
        contentType: "application/json",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (resp, textStatus, jqxhr) {
            //console.log("customer save success: ", resp);
            clearSupInputFields()
            swal("Updated", "Supplier updated successfully!", "success");
            $("#btnSupSave").prop("disabled", true);
            $("#btnSupUpdate").prop("disabled", true);
            $("#btnSupDelete").prop("disabled", true);
        },
        error: function (xhr, textStatus, error) {
            console.log("sUpdate error: ", error);
            console.log("sUpdate error: ", xhr.status);
            if (xhr.status===404){
                swal("Error", "This supplier does not exits!", "error");
            }
        }
    })
}

$("#btnSupDelete").click(function () {
    let code = $("#txtSupCode").val();
    if (code === ""){
        swal("Error", "Please input valid Supplier ID!", "error");
        return;
    }
    deleteSupplier(code);
})

function deleteSupplier(code) {
    $.ajax({
        url: "http://localhost:8080/api/v1/supplier/delete?code="+code,
        method: "DELETE",
        dataType: "json",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (resp) {
            console.log("resp = "+resp)
            if (resp){
                swal("Deleted", "supplier deleted successfully!", "success");
                clearSupInputFields();
                return;
            }
            swal("Error", "This supplier does not exits!", "error");
        },
        error: function (xhr, status, error) {
            console.log("sDelete = "+error)
        }
    })
}

$("#btnSupplierSearch").click(function () {
    let searchValue = $("#txtSupplierSearch").val()
    if (searchValue===""){
        swal("Error", "Please input Supplier ID or Supplier name!", "error");
        return;
    }
    let searchType = $("#cmbSupplierSearch").val();

    if (searchType === "ID"){
        supSearchById(searchValue);
    } else if(searchType === "Name"){
        supSearchByName(searchValue);
    }
})

function supSearchByName(name) {
    $.ajax({
        url: "http://localhost:8080/api/v1/supplier/searchByName?name="+name,
        method: "GET",
        dataType: "json",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (resp) {
            if (resp.length === 0){
                swal("Error", "Supplier Name not found!", "error");
                return;
            }
            loadSupplierDataToTable(resp);
        },
        error: function (xhr, status, error) {
            console.log("supSearchByName = "+error)
        }
    })
}

function supSearchById(code) {
    $.ajax({
        url: "http://localhost:8080/api/v1/supplier/searchById?code="+code,
        method: "GET",
        dataType: "json",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (resp) {
            loadSupplierDataToTableById(resp);
        },
        error: function (xhr, textStatus, error) {
            console.log("supSearchById error: ", error);
            console.log("supSearchById error: ", xhr.status);
            if (xhr.status===404){
                swal("Error", "This supplier Id does not exits!", "error");
            }
        }
    })
}

function loadSupplierDataToTableById(supplier) {
    $("#tbody-supplier").empty();
    let newCategory = supplierCapitalizeFirstLetter(supplier.category)

    let row = `<tr>
                                <th>${supplier.code}</th>
                                <td>${supplier.name}</td>
                                <td>${supplier.email}</td>
                                <td>${newCategory}</td>
                                <td>${supplier.addressLine1} ${supplier.addressLine2}</td>
                                <td>${supplier.mobileContact}</td>
                                <td>${supplier.landLineContact}</td>
                                <td style="display: none">${supplier.addressLine1}</td>
                                <td style="display: none">${supplier.addressLine2}</td>
                              </tr>`;
    $("#tbody-supplier").append(row);
}

function loadSupplierDataToTable(resp) {
    $("#tbody-supplier").empty();
    $.each(resp, function (index, supplier) {
        let newCategory = supplierCapitalizeFirstLetter(supplier.category)

        let row = `<tr>
                                <th>${supplier.code}</th>
                                <td>${supplier.name}</td>
                                <td>${supplier.email}</td>
                                <td>${newCategory}</td>
                                <td>${supplier.addressLine1} ${supplier.addressLine2}</td>
                                <td>${supplier.mobileContact}</td>
                                <td>${supplier.landLineContact}</td>
                                <td style="display: none">${supplier.addressLine1}</td>
                                <td style="display: none">${supplier.addressLine2}</td>
                              </tr>`;
        $("#tbody-supplier").append(row);
    })
}

$("#tbody-supplier").on('click', 'tr', function (){
    let row = $(this)

    var id = row.children().eq(0).text();
    var name = row.children().eq(1).text();
    var email = row.children().eq(2).text();
    var category = row.children().eq(3).text();
    var mobileNumber = row.children().eq(5).text();
    var landLineNumber = row.children().eq(6).text();
    var addressLine1 = row.children().eq(7).text();
    var addressLine2 = row.children().eq(8).text();

    $("#btnSupSave").prop("disabled", true);
    $("#btnSupDelete").prop("disabled", false);
    $("#btnSupUpdate").prop("disabled", false);

    $("#txtSupCode").val(id)
    $("#txtSupName").val(name);
    $("#txtSupEmail").val(email);
    $("#cmbSupCategory").val(category);
    $("#txtSupAddLine01").val(addressLine1);
    $("#txtSupAddLine02").val(addressLine2);
    $("#txtSupMobile").val(mobileNumber);
    $("#txtSupLandLine").val(landLineNumber);
})

function loadNextSupplierId() {
    $.ajax({
        url:"http://localhost:8080/api/v1/supplier/nextId",
        method:"GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success:function (resp) {
            $("#txtSupCode").val(resp);
        },
        error:function (xhr, status, error) {
            console.log("loadNextSupplierId() ="+error)
        }
    })
}

function clearSupInputFields() {
    $("#txtSupName").val("");
    $("#txtSupEmail").val("");
    $("#cmbSupCategory").prop("selectedIndex", "Local");
    $("#txtSupAddLine01").val("");
    $("#txtSupAddLine02").val("");
    $("#txtSupMobile").val("");
    $("#txtSupLandLine").val("");

    $("#txtSupplierSearch").val("");

    $("#txtSupName,#txtSupEmail,#txtSupAddLine01,#txtSupAddLine02,#txtSupMobile,#txtSupLandLine").css("border", "1px solid #ced4da");
    setSupplierBtn();
    loadNextSupplierId();
    getAllSuppliers();
}

function supplierCapitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function checkSupEmptyInputFields() {
    if ($("#cmbSupCategory").val()===""){
        swal("Error", "Fill all empty the fields!", "error");
        return false;
    }
    return true
}