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
        clearItemDetailsInputFields();
        $("#btnAddToCart").prop("disabled", true);
    } else {
        swal("Out of Stock!", "This Item is out of stock!", "error");
    }

});
function setDataToCartTable() {
    let itemCode = $("#cmbItemCodes").val();
    let itemName = $("#lblItemName").text();
    let itemSize = $("#cmbItemSizes").val();
    let unitPrice = $("#lblItemUnitPrice").text();
    let buyingQty = $("#txtOrderQty").val();
    let total = parseInt(unitPrice) * parseInt(buyingQty);


    let availableQty = $("#lblQtyOnHand").text();
    let tableCheck = "notFound";

    $("#tbody-orderCart tr").each(function () {
        let tableItemCode = $(this).find("td:eq(0)").text();
        let tableSize = $(this).find("td:eq(2)").text();

        if (itemCode===tableItemCode && itemSize===tableSize){
            tableCheck = "found";
            let currentQty = $(this).find("td:eq(4)").text();
            let newQty = parseInt(currentQty) + parseInt(buyingQty);

            if (newQty > parseInt(availableQty)){
                swal("Out of Stock!", "This Item is out of stock!", "error");
            } else {
                $(this).find("td:eq(4)").text(newQty);
                let newTotal = unitPrice * newQty;
                $(this).find("td:eq(5)").text(newTotal);
                calculateTotal();
            }
        }
    })

    if (tableCheck === "notFound"){
        let row = `<tr>
                            <td>${itemCode}</td>
                            <td>${itemName}</td>
                            <td>${itemSize}</td>
                            <td>${unitPrice}</td>
                            <td>${buyingQty}</td>
                            <td>${total}</td>
                        </tr>`
        $("#tbody-orderCart").append(row);
        bindOrderCartTblDblClickEvent();
        calculateTotal();
    }
}
function bindOrderCartTblDblClickEvent() {
    $('#tbody-orderCart>tr').on("dblclick",function () {

        swal({
            title: "Are you sure?",
            text: "Do you want to delete this order.?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    $(this).remove();
                    calculateTotal();
                    swal("Deleted", "Order deleted successfully!", "success");
                } else {
                    swal("This data is safe!");
                }
            });
    });
}
function calculateTotal() {
    let finalTotal = 0;
    $("#tbody-orderCart>tr").each(function () {
        let rowTotal = parseFloat($(this).find("td:eq(5)").text())
        finalTotal = finalTotal+rowTotal;
    })
    $("#lblTotal").text(finalTotal);
    $('#lblSubTotal').text(finalTotal);

}

/*place order /////////////////////////////////////////////////////////////////////*/
$("#btnPlaceOrder").click(function () {
    let orderId = $("#txtOrderId").val();
    let orderDate = new Date();
    let totalPrice = parseFloat($("#lblSubTotal").text());

    let addedPoints;
    if (totalPrice>= 800){
        addedPoints = 1;
    }else {
        addedPoints = 0;
    }

    let paymentMethod = $("#cmbPaymentMethod").val();
    let cashierName = $("#lblCashierName").text();
    let customerId = $("#cmbCustomerIds").val();
    let customerName = $("#lblCustomerName").text();

    let orderDetailList = [];
    $("#tbody-orderCart>tr").each(function () {
        let orderDetail = {
            order_id: orderId,
            item_code: $(this).find("td:eq(0)").text(),
            itemName: $(this).find("td:eq(1)").text(),
            size: $(this).find("td:eq(2)").text(),
            unitPrice: $(this).find("td:eq(3)").text(),
            itemQty: $(this).find("td:eq(4)").text()
        }
        orderDetailList.push(orderDetail);
    })

  let orderObj = {
      orderId:orderId,
      orderDate:orderDate,
      totalPrice:totalPrice,
      addedPoints:addedPoints,
      paymentMethod:paymentMethod,
      cashierName:cashierName,
      customer_id:customerId,
      customerName:customerName,
      orderDetailDTOList:orderDetailList
  }
    const jsonObj = JSON.stringify(orderObj);
    console.log(jsonObj);

    $.ajax({
        url: "http://localhost:8080/api/v1/placeOrder/placeOrder",
        method: "POST",
        data: jsonObj,
        contentType: "application/json",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (resp, textStatus, jqxhr) {
            console.log("placeOder success: ", resp);
            clearItemDetailsInputFields();
            clearPlaceOrderInputFields();
            $("#btnPlaceOrder").prop("disabled", true);
            swal("Order placed", "Order placed successfully!", "success");
        },
        error: function (xhr, textStatus, error) {
            console.log("placeOrder error: ", error);
            console.log("placeOrder error: ", xhr);
        }
    })
})


//calculate balance////////////////////////////////////////
$('#txtCash').on("keyup",function (){
    if (validateTxtCash()) {
        calculateBalance();
    } else {
        $('#lblBalance').text("");
    }
});

function calculateBalance() {
    let subTotal = parseFloat($('#lblSubTotal').text());
    let cash = parseFloat($('#txtCash').val());

    if (subTotal <= cash) {
        let balance = cash - subTotal;
        $('#lblBalance').text(balance);
        $("#btnPlaceOrder").prop("disabled", false);
    } else {
        $('#lblBalance').text("");
        $("#btnPlaceOrder").prop("disabled", true);
    }
}

//calculate sub total //////////////////////////////////////
$('#txtDiscount').on("keyup",function () {
    if (validateTxtDiscount()) {
        calculateSubTotal();
    } else {
        $('#lblSubTotal').text("");
        $("#btnPlaceOrder").prop("disabled", true);
    }
});

function calculateSubTotal() {
    let total = parseFloat($('#lblTotal').text());
    if (!$('#txtDiscount').val()== "" ) {
        let discountPercentage = parseInt($('#txtDiscount').val());

        let discount = total*discountPercentage/100;
        let subTotal = total - discount
        $('#lblSubTotal').text(subTotal);
        calculateBalance();
    } else {
        $('#lblSubTotal').text(total);
        calculateBalance();
    }
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
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
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
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success:function (resp) {
            $("#lblCustomerName").text(resp.name);
            $("#lblCustomerLoyaltyLevel").text(resp.loyaltyLevel);
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
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
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
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
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
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
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
    let orderDate = `${year}-${month}-${day}`;
    $('#txtOrderDate').val(orderDate);
}

/*clear input fields ///////////////////////////////////////////////////////////////*/
function clearItemDetailsInputFields() {
    $("#cmbItemSizes").val("")
    $("#lblQtyOnHand").text("");
    $("#txtOrderQty").val("");
}
function clearPlaceOrderInputFields() {
    loadNextOrderId();
    $("#cmbCustomerIds").val("");
    $("#lblCustomerName").text("");
    $("#cmbItemCodes").val("");
    $("#lblItemName").text("");
    $("#lblItemUnitPrice").text("");

    $("#tbody-orderCart").empty();

    $("#lblSubTotal, #lblTotal, #lblBalance").text("");
    $("#txtCash, #txtDiscount, #txtAddPoints").val("");
    $("#cmbPaymentMethod").prop("selectedIndex", "Cash");
    $("#card-details-div").css("display", "none")
}

$("#cmbPaymentMethod").change(function () {
    let payMethod = $("#cmbPaymentMethod").val();
    if (payMethod === "Card"){
        $("#card-details-div").css("display", "block")
    } else {
        $("#card-details-div").css("display", "none")
    }
});
