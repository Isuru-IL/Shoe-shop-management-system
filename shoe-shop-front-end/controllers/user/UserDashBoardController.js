initiateUI();

function initiateUI() {
    clearAll();
    console.log("User-page")
    $("#user-home-page").css('display', 'block');
    //$("header").css('display', 'none');
    setTheLastView();
    setImageForHeader();
}

function setTheLastView() {
    let view = localStorage.getItem("view");
    switch (view) {
        case "HOME":
            setView($("#user-home-page"));
            break;
        case "CUSTOMER":
            setView($("#user-customer-page"));
            break;
        case "EMPLOYEE":
            setView($("#user-employee-page"));
            break;
        case "SUPPLIER":
            setView($("#user-supplier-page"));
            break;
        case "ITEM":
            setView($("#user-item-page"));
            break;
        case "PRODUCT":
            setView($("#user-product-page"));
            break;
        case "ORDERS":
            setView($("#user-order-page"));
            break;
        case "ORDER-DETAILS":
            setView($("#user-order-detail-page"));
            break;
        /*case "LOG-IN":
            setView($("#log-in-page"));
            break;
        case "SIGN-UP":
            setView($("#sign-up-page"));
            break; */
        default:
            setView($("#user-home-page"));
    }
}

function saveLastView(clickedID) {
    console.log("clickedID ="+clickedID)
    switch (clickedID) {
        case "user-home-page":
            localStorage.setItem("view", "HOME");
            break;
        case "user-customer-page":
            localStorage.setItem("view", "CUSTOMER");
            break;
        case "user-employee-page":
            localStorage.setItem("view", "EMPLOYEE");
            break;
        case "user-supplier-page":
            localStorage.setItem("view", "SUPPLIER");
            break;
        case "user-item-page":
            localStorage.setItem("view", "ITEM");
            break;
        case "user-product-page":
            localStorage.setItem("view", "PRODUCT");
            break;
        case "user-order-page":
            localStorage.setItem("view", "ORDERS");
            break;
        case "user-order-detail-page":
            localStorage.setItem("view", "ORDER-DETAILS");
            break;
        /*case "log-in-page":
            localStorage.setItem("view", "LOG-IN");
            break;
        case "sign-up-page":
            localStorage.setItem("view", "SIGN-UP");
            break; */
    }
}

function setView(viewOb) {
    console.log("User "+viewOb.get(0).id);
    clearAll();
    viewOb.css("display", "block");
    $("header").css('display', 'block');
    saveLastView(viewOb.get(0).id);
    /*if (viewOb.get(0).id === "log-in-page" || viewOb.get(0).id === "sign-up-page"){
        clearAll();
        viewOb.css("display", "block");
        $("header").css('display', 'none');
        saveLastView(viewOb.get(0).id);
    }else {
        clearAll();
        viewOb.css("display", "block");
        $("header").css('display', 'block');
        saveLastView(viewOb.get(0).id);
    }*/
}

function clearAll() {
    // $("#home-page,#customer-page,#item-page,#order-page,#order-detail-page,#log-in-page,#sign-up-page").css('display','none');
    $("#user-home-page,#user-customer-page,#user-employee-page,#user-supplier-page,#user-item-page,#user-product-page,#user-order-page,#user-order-detail-page").css('display','none');
}


$("#user-home-nav").click(function () {
    setView($("#user-home-page"));
});

$("#user-customer-nav").click(function () {
    setView($("#user-customer-page"));
    customerInitialize();
});

$("#user-employee-nav").click(function () {
    setView($("#user-employee-page"));
    employeeInitialize();
});

$("#user-supplier-nav").click(function () {
    setView($("#user-supplier-page"));
    supplierInitialize();
});

$("#user-item-nav").click(function () {
    setView($("#user-item-page"));
    itemInitialize();
});

$("#user-product-nav").click(function () {
    setView($("#user-product-page"));
    productInitialize();
});

$("#user-order-nav").click(function () {
    placeOrderInitialize();
    setView($("#user-order-page"));
});

$("#user-order-detail-nav").click(function () {
    setView($("#user-order-detail-page"));
    orderDetailInitialize();
});

/*$("#log-in-nav").click(function () {
    setView($("#log-in-page"));
});

$("#sign-up-nav").click(function () {
    setView($("#sign-up-page"));
});*/

function setImageForHeader() {
    let email = localStorage.getItem("empEmail")
    console.log(email)

    $.ajax({
        url: "http://localhost:8080/api/v1/employee/searchByEmail?email="+email,
        method: "GET",
        dataType: "json",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (resp) {

            var imageElement = `<img id="headerImg" alt="image" src="data:image/png;base64,${resp.proPic}" width="45px" height="45px">`;
            $("#admin-img-div").empty();
            $("#admin-img-div").append(imageElement);

            $("#lblCashierName").text(resp.name);
        },
        error: function (xhr, textStatus, error) {
            console.log("empSearchByEmail error: ", error);
            console.log("empSearchByEmail error: ", xhr.status);
            if (xhr.status===404){
                swal("Error", "This employee does not exits!", "error");
            }
        }
    })
}