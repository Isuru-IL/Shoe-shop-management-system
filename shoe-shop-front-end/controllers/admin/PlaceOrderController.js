function placeOrderInitialize() {
    loadNextOrderId();
    setDataToOrderDate();
    loadCustomerIds();
    loadItemCodes();
}
loadNextOrderId();
setDataToOrderDate();
loadCustomerIds();
loadItemCodes();

let itemObj;

/*add to card //////////////////////////////////////////////////////////////////////*/
$('#btnAddToCart').click(function () {
    let qtyOnHand = parseInt($('#lblQtyOnHand').text());
    let orderQty = parseInt($('#txtOrderQty').val());

    if (qtyOnHand >= orderQty) {
        setDataToCartTable();
        $("#btnAddToCart").prop("disabled", true);
    } else {
        swal("Out of Stock!", "This Item is out of stock!", "error");
    }

});
function setDataToCartTable() {

}

/*place order page load content ///////////////////////////////////////////////////*/
$("#cmbItemSizes").change(function () {
    let size = $(this).val();

    if (itemObj && itemObj.hasOwnProperty(size)) {
        let qtyOnHand = itemObj[size];
        if (qtyOnHand>0){
            $("#lblQtyOnHand").text(qtyOnHand);
        } else {
            $("#lblQtyOnHand").text("Not available");
        }
    } else {
        $("#lblQtyOnHand").text("Quantity not available");
    }
})
$("#cmbItemCodes").change(function () {
    let code = $(this).val();
    if (code!==""){
        $("#cmbItemSizes").prop("disabled", false);
    } else {
        $("#cmbItemSizes").prop("disabled", true);
    }
    $.ajax({
        url:"http://localhost:8080/api/v1/placeOrder/searchItemByCode?code="+code,
        method:"GET",
        success:function (resp) {
            itemObj = resp;
            console.log(itemObj)
            $("#lblItemName").text(itemObj.description);
            $("#lblItemUnitPrice").text(itemObj.salePrice);
        },
        error:function (xhr, status, error) {
            console.log("searchCusById() ="+error)
            if (xhr.status===404){
                swal("Error", "This Item does not exits!", "error");
            } else {
                swal("Error", "Failed to retrieve item details. Please try again later.", "error");
            }
        }
    })
})
$("#cmbCustomerIds").change(function () {
    let code = $(this).val();
    $.ajax({
        url:"http://localhost:8080/api/v1/placeOrder/searchCusById?code="+code,
        method:"GET",
        success:function (resp) {
            $("#lblCustomerName").text(resp.name);
        },
        error:function (xhr, status, error) {
            console.log("searchCusById() ="+error)
            if (xhr.status===404){
                swal("Error", "This Customer does not exits!", "error");
            }
        }
    })
})
function loadItemCodes() {
    $.ajax({
        url:"http://localhost:8080/api/v1/placeOrder/loadItemCodes",
        method:"GET",
        success:function (resp) {
            $("#cmbItemCodes").empty().append(`<option selected></option>`);
            $.each(resp, function (index, code) {
                $("#cmbItemCodes").append(`<option value="${code}">${code}</option>`);
            })
        },
        error:function (xhr, status, error) {
            console.log("loadItemCodes() ="+error)
        }
    })
}
function loadCustomerIds() {
    $.ajax({
        url:"http://localhost:8080/api/v1/placeOrder/loadCusIds",
        method:"GET",
        success:function (resp) {
            $("#cmbCustomerIds").empty().append(`<option selected></option>`);
            $.each(resp, function (index, cusId) {
                $("#cmbCustomerIds").append(`<option value="${cusId}">${cusId}</option>`);
            })
        },
        error:function (xhr, status, error) {
            console.log("loadCusId() ="+error)
        }
    })
}
function loadNextOrderId() {
    $.ajax({
        url:"http://localhost:8080/api/v1/placeOrder/nextOrderId",
        method:"GET",
        success:function (resp) {
            $("#txtOrderId").val(resp);
        },
        error:function (xhr, status, error) {
            console.log("loadNextOrderId() ="+error)
        }
    })
}
function setDataToOrderDate() {
    let today = new Date();
    let year = today.getFullYear();
    let month = String(today.getMonth() + 1).padStart(2, '0');
    let day = String(today.getDate()).padStart(2, '0');
    let orderDate = `${day}-${month}-${year}`;
    $('#txtOrderDate').val(orderDate);
}