$("#btnUserSupplierClear").click(function () {
    $("#cmbSupplierSearch").prop("selectedIndex", "ID");
    $("#txtSupplierSearch").val("");
    getAllSuppliers();
});