$("#btnUserCustomerClear").click(function () {
    $("#cmbCustomerSearch").prop("selectedIndex", "ID");
    $("#txtCustomerSearch").val("");
    getAllCustomers();
});