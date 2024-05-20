function productInitialize() {
    getAllProItems();
}

function getAllProItems() {
    $.ajax({
        url: "http://localhost:8080/api/v1/inventory/getAllItems",
        method: "GET",
        dataType: "json",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (resp) {
            loadInventoryDataToGrid(resp);
        },
        error: function (xhr, status, error) {
            console.log("getAllProductInventory = "+error)
            console.log("getAllProductInventory = "+xhr)
        }
    })
}

$("#btnProductPriceSearch").click(function () {
    let minPrice = parseFloat($("#txtMinPrice").val());
    let maxPrice = parseFloat($("#txtMaxPrice").val());

    clearProductInputFields()
    $("#txtMinPrice").val(minPrice);
    $("#txtMaxPrice").val(maxPrice);

    if (isNaN(minPrice) || isNaN(maxPrice) || minPrice === "" || maxPrice === "") {
        swal("Error", "Please enter both minimum and maximum prices!", "error");
        return;
    }
    if (minPrice>maxPrice){
        swal("Error", "Minimum price should be less than maximum price!", "error");
        return;
    }
    $.ajax({
        url: "http://localhost:8080/api/v1/inventory/getAllItemsByPrice/"+minPrice+"/"+maxPrice,
        method: "GET",
        dataType: "json",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (resp) {
            loadInventoryDataToGrid(resp);
        },
        error: function (xhr, status, error) {
            console.log("getAllProductPriceInventory = "+error)
            console.log("getAllProductPriceInventory = "+xhr)
        }
    })
})

$("#btnProductNameSearch").click(function () {
    let name = $("#txtProductName").val();

    clearProductInputFields();
    $("#txtProductName").val(name);

    if (name === "") {
        swal("Error", "Please enter Name!", "error");
        return;
    }
    $.ajax({
        url: "http://localhost:8080/api/v1/inventory/searchByName?name="+name,
        method: "GET",
        dataType: "json",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (resp) {
            if (resp.length === 0){
                swal("Error", "Item Name not found!", "error");
                return;
            }
            loadInventoryDataToGrid(resp);
        },
        error: function (xhr, status, error) {
            console.log("productSearchByName = "+error)
        }
    })
})

$("#cmbChooseByGender").change(function () {
    let gender = $(this).val();

    clearProductInputFields();
    $(this).val(gender);
    console.log(gender);

    $.ajax({
        url: "http://localhost:8080/api/v1/inventory/getAllItemsByCategoryGender?gender="+gender,
        method: "GET",
        dataType: "json",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (resp) {
            if (resp.length === 0){
                swal("Error", "Items not found!", "error");
                return;
            }
            loadInventoryDataToGrid(resp);
        },
        error: function (xhr, status, error) {
            console.log("productSearchByGender = "+error)
        }
    })
})

$("#cmbChooseByOccasion").change(function () {
    let occasion = $(this).val();

    clearProductInputFields();
    $(this).val(occasion);
    console.log(occasion);

    $.ajax({
        url: "http://localhost:8080/api/v1/inventory/getAllItemsByCategoryOccasion?occasion="+occasion,
        method: "GET",
        dataType: "json",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (resp) {
            if (resp.length === 0){
                swal("Error", "Items not found!", "error");
                return;
            }
            loadInventoryDataToGrid(resp);
        },
        error: function (xhr, status, error) {
            console.log("productSearchByOccasion = "+error)
        }
    })
})

function loadInventoryDataToGrid(resp) {
    $("#product-grid").empty();

    $.each(resp, function (index, inventory) {
        let card = `
                     <div class="card" style="">
                        <img src="${inventory.itemPic}" class="card-img-top" style="min-height: 200px; border-radius: 1.4em">
                        <div style="display: flex; flex-direction: column; align-items: center;" class="card-body pt-2 px-3">
                            <h4 class="mt-2" style="font-weight: 700">${inventory.code}</h4>
                            <h5 class="card-title mb-0">${inventory.description}</h5>
                            <h6 class="small mt-1">${inventory.category}</h6>
                            <h5 class="mb-2 mt-2">Rs. ${inventory.salePrice}/=</h5>
                            <p class="card-text" style="font-size: 14px; margin: 0">Size-6:&nbsp;${inventory.size_6}&nbsp;&nbsp;  Size-7:&nbsp;${inventory.size_7}</p>
                            <p class="card-text" style="font-size: 14px; margin: 0">Size-8:&nbsp;${inventory.size_8}&nbsp;&nbsp;  Size-9:&nbsp;${inventory.size_9}</p>
                        </div>
                    </div>`
        $("#product-grid").append(card);

    })
}

$("#btnProductClear").click(function () {
    clearProductInputFields();
    getAllProItems();
})
function clearProductInputFields() {
    $("#txtMinPrice").val("");
    $("#txtMaxPrice").val("");
    $("#txtProductName").val("");
    $("#cmbChooseByGender").val("Choose by Gender");
    $("#cmbChooseByOccasion").val("Choose by Occasion");
}