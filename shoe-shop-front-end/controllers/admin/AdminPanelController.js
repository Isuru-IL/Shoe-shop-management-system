function adminPanelInitialize() {
    loadDataToTodayUpdates();

    let date = new Date();
    let formattedDate = date.toISOString().split('T')[0];
    loadDataToSelectedDate(formattedDate);
}
const token = localStorage.getItem("token");

function loadDataToTodayUpdates() {
    let date = new Date();
    let formattedDate = date.toISOString().split('T')[0]; // Formats date as "yyyy-MM-dd"

    $.ajax({
        url: "http://localhost:8080/api/v1/adminPanel/getSummeryForToday?date=" + formattedDate,
        method: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token") // Assuming token is stored in localStorage
        },
        success: function (resp) {
            console.log(resp)
            $("#ordersCount").text(resp.ordersCount);
            $("#totalSales").text(`Rs.${resp.totalPrice.toFixed(2)}`);
            $("#goldCustomersCount").text(resp.goldCusCount);
        },
        error: function (xhr, textStatus, error) {
            console.error("Error fetching today's orders: ", error);
        }
    });
}

$("#btnPanelSearchByDate").click(function () {
    const selectedDate =  $("#adminPanelSelectedDate").val();
    if (!selectedDate) {
        swal("Error", "Please select a date!", "error");
        return;
    }
    loadDataToSelectedDate(selectedDate);
});
function loadDataToSelectedDate(selectedDate) {
    $.ajax({
        url: "http://localhost:8080/api/v1/adminPanel/getSummeryForSelectedDate?date=" + selectedDate,
        method: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token") // Assuming token is stored in localStorage
        },
        success: function (data) {
            console.log(data)
            if (data.totalPrice === null){
                data.totalPrice=0.00;
                console.log(data.totalPrice)
            }
            if (data.mostSoldItemName === null){
                swal("Error", "Cannot find sales for this date!", "error");
                return
            }
            console.log(data)
            let profit = data.totalPrice*20/100
            console.log(profit)

            $("#selectedTotalSales").text(`Rs.${data.totalPrice.toFixed(2)}`);
            $("#selectedTotalProfit").text(`Rs.${profit.toFixed(2)}`);
            $("#selectedMostSoldItem").text(data.mostSoldItemName);
            $('#selectedMostSoldItemPicture').attr('src', data.mostSoldItemPicture);
            $('#selectedMostSoldItemQty').text(data.mostSoldItemQty);
        },
        error: function (xhr, textStatus, error) {
            console.error("Error fetching selected date's orders: ", error);
        }
    });
}