$("#btnUserItemClear").click(function () {
    $("#cmbItemSearch").prop("selectedIndex", "ID");
    $("#txtItemSearch").val("");
    getAllItem();
});