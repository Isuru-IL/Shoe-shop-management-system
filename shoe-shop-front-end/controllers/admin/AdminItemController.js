function itemInitialize() {
    loadAllSuppliersCode();
    getAllItem();
}
getAllItem();
loadAllSuppliersCode();
let supplierAllData;

function getAllItem() {
    $.ajax({
        url: "http://localhost:8080/api/v1/inventory/getAllItems",
        method: "GET",
        dataType: "json",
        success: function (resp) {
            loadInventoryDataToTable(resp);
        },
        error: function (xhr, status, error) {
            console.log("getAllInventory = "+error)
        }
    })
}

$("#btnItemSave").click(function () {
    if (checkAllItems()) {
        if (checkItemEmptyInputFields()){
            saveItem();
        }
    } else {
        swal("Error", "Please check the input fields!", "error");
    }
})
function saveItem() {
    let code = $("#txtItemCode").val();
    let description = $("#txtItemDesc").val();
    let category = $("#txtItemCategory").val();
    let salePrice = $("#txtItemUnitPriceSale").val();
    let buyPrice = $("#txtItemUnitPriceBuy").val();
    let profit = $("#txtItemProfit").val();
    let profitMargin = $("#txtItemProfitMargin").val();
    let status = $("#txtItemStatus").val();
    let supplierCode = $("#cmbItemSupCode").val();
    let supplierName = $("#txtItemSupName").val();
    let size_6 = $("#txtItemSize6").val();
    let size_7 = $("#txtItemSize7").val();
    let size_8 = $("#txtItemSize8").val();
    let size_9 = $("#txtItemSize9").val();
    let itemPicInput = $("#txtItemProfilePic")[0]; // File input element
    let itemPicFile = itemPicInput.files[0]; // Get the first selected file

    if (!itemPicFile) {
        // Handle case where no file is selected
        console.error('No file selected');
        return;
    }

    let reader = new FileReader();
    reader.onload = function (event) {
        let base64String = event.target.result;

        var itemObj = {
            "code":code,
            "description":description,
            "category":category,
            "salePrice":salePrice,
            "buyPrice":buyPrice,
            "profit":profit,
            "profitMargin":profitMargin,
            "status":status,
            "supplierCode":supplierCode,
            "supplierName":supplierName,
            "size_6":size_6,
            "size_7":size_7,
            "size_8":size_8,
            "size_9":size_9,
            "itemPic":base64String
        }

        $.ajax({
            url: "http://localhost:8080/api/v1/inventory/save",
            method: "POST",
            dataType: "json",
            contentType:"application/json",
            data: JSON.stringify(itemObj),
            success: function (resp) {
                //console.log("customer save success: ", resp);
                clearItemInputFields()
                swal("Saved", "Item saved successfully!", "success");
                /*$("#btnCustomerSave").prop("disabled", true);
                $("#btnCustomerUpdate").prop("disabled", true);
                $("#btnCustomerDelete").prop("disabled", true);*/
            },
            error: function (xhr, textStatus, error) {
                console.log("iSave error: ", error);
                console.log("iSave error: ", xhr.status);
                if (xhr.status===409){
                    swal("Error", "This item is already exits!", "error");
                }
            }
        })
    };
    reader.readAsDataURL(itemPicFile);
}

$("#btnItemUpdate").click(function () {
    if (checkAllItems()) {
        if (checkItemEmptyInputFields()){
            updateItem();
        }
    } else {
        swal("Error", "Please check the input fields!", "error");
    }
})
function updateItem() {
    let code = $("#txtItemCode").val();
    let description = $("#txtItemDesc").val();
    let category = $("#txtItemCategory").val();
    let salePrice = $("#txtItemUnitPriceSale").val();
    let buyPrice = $("#txtItemUnitPriceBuy").val();
    let profit = $("#txtItemProfit").val();
    let profitMargin = $("#txtItemProfitMargin").val();
    let status = $("#txtItemStatus").val();
    let supplierCode = $("#cmbItemSupCode").val();
    let supplierName = $("#txtItemSupName").val();
    let size_6 = $("#txtItemSize6").val();
    let size_7 = $("#txtItemSize7").val();
    let size_8 = $("#txtItemSize8").val();
    let size_9 = $("#txtItemSize9").val();
    let itemPicInput = $("#txtItemProfilePic")[0]; // File input element
    let itemPicFile = itemPicInput.files[0]; // Get the first selected file

    if (!itemPicFile) {
        // Handle case where no file is selected
        console.error('No file selected');
        return;
    }

    let reader = new FileReader();
    reader.onload = function (event) {
        let base64String = event.target.result;

        var itemObj = {
            "code":code,
            "description":description,
            "category":category,
            "salePrice":salePrice,
            "buyPrice":buyPrice,
            "profit":profit,
            "profitMargin":profitMargin,
            "status":status,
            "supplierCode":supplierCode,
            "supplierName":supplierName,
            "size_6":size_6,
            "size_7":size_7,
            "size_8":size_8,
            "size_9":size_9,
            "itemPic":base64String
        }

        $.ajax({
            url: "http://localhost:8080/api/v1/inventory/update",
            method: "PATCH",
            dataType: "json",
            contentType:"application/json",
            data: JSON.stringify(itemObj),
            success: function (resp) {
                //console.log("customer save success: ", resp);
                clearItemInputFields()
                swal("Update", "Item updated successfully!", "success");
                /*$("#btnCustomerSave").prop("disabled", true);
                $("#btnCustomerUpdate").prop("disabled", true);
                $("#btnCustomerDelete").prop("disabled", true);*/
            },
            error: function (xhr, textStatus, error) {
                console.log("iUpdate error: ", error);
                console.log("iUpdate error: ", xhr.status);
                if (xhr.status === 404) {
                    swal('Error', 'This Item does not exist!', 'error');
                } else {
                    swal('Error', 'Failed to update item.', 'error');
                }
            }
        })
    };
    reader.readAsDataURL(itemPicFile);
}

$("#btnItemDelete").click(function () {
    let code = $("#txtItemCode").val();
    if (code === "") {
        swal("Error", "Please input valid Item Code!", "error");
        return;
    }
    deleteItem(code);
})
function deleteItem(code) {
    $.ajax({
        url: "http://localhost:8080/api/v1/inventory/delete?code="+code,
        method: "DELETE",
        dataType: "json",
        success: function (resp) {
            console.log("resp = "+resp)
            if (resp){
                swal("Deleted", "Item deleted successfully!", "success");
                clearItemInputFields();
                return;
            }
            swal("Error", "This Item does not exits!", "error");
        },
        error: function (xhr, status, error) {
            console.log("empDelete = "+error)
        }
    })
}

$("#btnItemSearch").click(function () {
    let searchValue = $("#txtItemSearch").val()
    if (searchValue===""){
        swal("Error", "Please input Item Code or Item name!", "error");
        return;
    }
    let searchType = $("#cmbItemSearch").val();

    if (searchType === "ID"){
        itemSearchById(searchValue);
    } else if(searchType === "Name"){
        itemSearchByName(searchValue);
    }
})

$("#btnItemClear").click(function () {
    clearItemInputFields();
})

function loadInventoryDataToTable(resp) {
    $("#tbody-item").empty();
    $.each(resp, function (index, item) {

        //console.log("table = "+item.itemPic)

        let row = `<tr style="vertical-align: middle;">
                                <th>${item.code}</th>
                                <td><img alt="image" src="${item.itemPic}" style="max-width: 50px; height: 50px; border-radius: 10px;"></td>
                                <td>${item.description}</td>
                                <td>${item.category}</td>
                                <td>${item.size_6}</td>
                                <td>${item.size_7}</td>
                                <td>${item.size_8}</td>
                                <td>${item.size_9}</td>
                                <td>${item.salePrice}</td>
                                <td>${item.buyPrice}</td>
                                <td>${item.profit}</td>
                                <td>${item.profitMargin}</td>
                                <td>${item.status}</td>
                                <td>${item.supplierCode}</td>
                                <td>${item.supplierName}</td>
                                <td style="display: none">${item.itemPic}</td>
                              </tr>`;
        $("#tbody-item").append(row);
    })
}

function loadInventoryDataToTableById(item) {
    $("#tbody-item").empty();
    let row = `<tr style="vertical-align: middle;">
                                <th>${item.code}</th>
                                <td><img alt="image" src="${item.itemPic}" style="max-width: 50px; height: 50px; border-radius: 10px;"></td>
                                <td>${item.description}</td>
                                <td>${item.category}</td>
                                <td>${item.size_6}</td>
                                <td>${item.size_7}</td>
                                <td>${item.size_8}</td>
                                <td>${item.size_9}</td>
                                <td>${item.salePrice}</td>
                                <td>${item.buyPrice}</td>
                                <td>${item.profit}</td>
                                <td>${item.profitMargin}</td>
                                <td>${item.status}</td>
                                <td>${item.supplierCode}</td>
                                <td>${item.supplierName}</td>
                                <td style="display: none">${item.itemPic}</td>
                              </tr>`;
    $("#tbody-item").append(row);
}

$("#tbody-item").on('click', 'tr', function () {
    let row = $(this)

    var code = row.children().eq(0).text();
    var proPic = row.children().eq(1).html();
    var description = row.children().eq(2).text();
    var category = row.children().eq(3).text();
    var size6 = row.children().eq(4).text();
    var size7 = row.children().eq(5).text();
    var size8 = row.children().eq(6).text();
    var size9 = row.children().eq(7).text();
    var salePrice = row.children().eq(8).text();
    var buyPrice = row.children().eq(9).text();
    var profit = row.children().eq(10).text();
    var profitMargin = row.children().eq(11).text();
    var status = row.children().eq(12).text();
    var supCode = row.children().eq(13).text();
    var supName = row.children().eq(14).text();
    var divItemPic = row.children().eq(15).text();

    //console.log(proPic)

    var base64Data;
    var matches = proPic.match(/src="data:image\/jpeg;base64,([^"]+)"/);
    if (matches) {
        base64Data = matches[1];
        //console.log("base64 = "+base64Data);

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
        //console.log(file)

        var dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);

        // Set the files property of the file chooser input field using the files property of the DataTransfer object
        var fileInput = document.getElementById('txtItemProfilePic');
        fileInput.files = dataTransfer.files;

    } else {
        console.log("No image data found in the table cell.");
    }

    $("#txtItemCode").val(code);
    $("#txtItemDesc").val(description);
    $("#txtItemCategory").val(category);
    $("#txtItemUnitPriceSale").val(salePrice);
    $("#txtItemUnitPriceBuy").val(buyPrice);
    $("#txtItemProfit").val(profit);
    $("#txtItemProfitMargin").val(profitMargin);
    $("#txtItemStatus").val(status);
    $("#cmbItemSupCode").val(supCode);
    $("#txtItemSupName").val(supName);
    $("#txtItemSize6").val(size6);
    $("#txtItemSize7").val(size7);
    $("#txtItemSize8").val(size8);
    $("#txtItemSize9").val(size9);


    $("#item-pic-div").empty().append(`<img alt="image" src="${divItemPic}" style="max-width: 100px; height: auto; padding: 0; border-radius: 1.4em;">`);
})

function itemSearchById(code) {
    $.ajax({
        url: "http://localhost:8080/api/v1/inventory/searchById?code="+code,
        method: "GET",
        dataType: "json",
        success: function (resp) {
            loadInventoryDataToTableById(resp);
        },
        error: function (xhr, textStatus, error) {
            console.log("itemSearchById error: ", error);
            console.log("itemSearchById error: ", xhr.status);
            if (xhr.status===404){
                swal("Error", "This Item does not exits!", "error");
            }
        }
    })
}
function itemSearchByName(name) {
    $.ajax({
        url: "http://localhost:8080/api/v1/inventory/searchByName?name="+name,
        method: "GET",
        dataType: "json",
        success: function (resp) {
            if (resp.length === 0){
                swal("Error", "Item Name not found!", "error");
                return;
            }
            loadInventoryDataToTable(resp);
        },
        error: function (xhr, status, error) {
            console.log("itemSearchByName = "+error)
        }
    })
}

function loadAllSuppliersCode() {
    $("#cmbItemSupCode").empty();
    $("#cmbItemSupCode").append(`<option selected></option>`);
    $.ajax({
        url: "http://localhost:8080/api/v1/inventory/loadSuppliersCode",
        method: "GET",
        dataType: "json",
        success: function (resp) {
            supplierAllData = resp;
            $.each(resp,function (index, supplier) {
                $("#cmbItemSupCode").append(`<option value="${supplier.code}">${supplier.code}</option>`);
            })
        },
        error: function (xhr, status, error) {
            console.log("getItemAllSuppliers = "+error)
        }
    })

    $("#cmbItemSupCode").click(function () {
        $.each(supplierAllData,function (index, supplier) {
            if ($("#cmbItemSupCode").val()===supplier.code){
                $("#txtItemSupName").val(supplier.name);
            }
        })
    })
}

$('#txtItemProfilePic').on('change', function(event) {
    if ($('#txtItemProfilePic').val() !== ""){
        $("#item-pic-div").empty();
        var file = $(this).prop('files')[0];
        var reader = new FileReader();

        reader.onload = function(e) {
            var imageElement = `<img alt="image" src="${e.target.result}" style="max-width: 100px; height: auto; padding: 0; border-radius: 1.4em;">`;
            $("#item-pic-div").append(imageElement);
        };

        reader.readAsDataURL(file);
    }
    $("#item-pic-div").empty();
});

function clearItemInputFields() {
    $("#txtItemCode").val("");
    $("#txtItemDesc").val("");
    $("#txtItemCategory").val("");
    $("#txtItemUnitPriceSale").val("");
    $("#txtItemUnitPriceBuy").val("");
    $("#txtItemProfit").val("");
    $("#txtItemProfitMargin").val("");
    $("#txtItemStatus").val("");
    $("#cmbItemSupCode").val("");
    $("#txtItemSupName").val("");
    $("#txtItemSize6").val("");
    $("#txtItemSize7").val("");
    $("#txtItemSize8").val("");
    $("#txtItemSize9").val("");
    $("#txtItemProfilePic").val("");

    $("#item-pic-div").empty();

    $("#txtItemSearch").val("");
    loadAllSuppliersCode();
    getAllItem();
}

function checkItemEmptyInputFields(){
    if ($("#cmbItemSupCode").val()==="" || $("#txtItemSupName").val()==="" ||$("#txtItemProfilePic").val()===""){
        swal("Error", "Fill all empty the fields!", "error");
        return false;
    }
    return true
}