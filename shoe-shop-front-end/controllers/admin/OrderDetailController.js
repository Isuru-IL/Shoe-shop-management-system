function orderDetailInitialize() {
    getAllRefundOrders();
}
function getAllRefundOrders() {
    $.ajax({
        url: "http://localhost:8080/api/v1/orderDetail/getAllRefundOrders",
        method: "GET",
        dataType: "json",
        success: function (resp) {
            console.log(resp)
            loadRefundOrdersDataToTable(resp);
        },
        error: function (xhr, status, error) {
            console.log("getAllSuppliers = "+error)
        }
    })
}
function loadRefundOrdersDataToTable(resp) {
    $("#tbody-refund-orders").empty();
    $.each(resp, function (index, order) {

        // Format the orderDate
        let formattedDate = new Date(order.orderDate).toLocaleString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });

        let row = `<tr>
                                <th>${order.orderId}</th>
                                <td>${order.cashierName}</td>
                                <td>${order.customerName}</td>
                                <td>${formattedDate}</td>
                                <td>${order.addedPoints}</td>
                                <td>${order.totalPrice}</td>
                                <td class="round-td">
                                    <button class="btn-refund">Refund</button>
                                </td>
                              </tr>`;
        $("#tbody-refund-orders").append(row);
    })

    $(".btn-refund").click(refundOrder);
}
function refundOrder() {
    console.log("refund");
    $(this).closest('tr').remove();

    $.ajax({
        url: "http://localhost:8080/api/v1/orderDetail/refundOrder",
        method: "DELETE",
        data: { orderId: $(this).closest('tr').find('th').text() },
        success: function(resp) {
            swal("Refund", "Order refunded successfully", "success");
        },
        error: function(xhr, status, error) {
            console.log("Error refunding order: ");
            console.log(xhr)
        }
    });
}

