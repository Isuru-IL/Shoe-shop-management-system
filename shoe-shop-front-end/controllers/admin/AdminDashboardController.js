initiateUI();

function initiateUI() {
    clearAll();
    console.log("Admin-page")
    $("#admin-home-page").css('display', 'block');
    //$("header").css('display', 'none');
    setTheLastView();
    setImageForHeader();
    //adminPanelInitialize();
}

function setTheLastView() {
    let view = localStorage.getItem("view");
    switch (view) {
         case "HOME":
             setView($("#admin-home-page"));
             break;
         case "CUSTOMER":
             setView($("#admin-customer-page"));
             break;
        case "EMPLOYEE":
            setView($("#admin-employee-page"));
            break;
        case "SUPPLIER":
            setView($("#admin-supplier-page"));
            break;
        case "ITEM":
            setView($("#admin-item-page"));
            break;
        case "PRODUCT":
            setView($("#admin-product-page"));
            break;
        case "ORDERS":
            setView($("#admin-order-page"));
            break;
        case "ORDER-DETAILS":
            setView($("#admin-order-detail-page"));
            break;
        /*case "LOG-IN":
            setView($("#log-in-page"));
            break;
        case "SIGN-UP":
            setView($("#sign-up-page"));
            break; */
        default:
            setView($("#admin-home-page"));
    }
}

function saveLastView(clickedID) {
    console.log("clickedID ="+clickedID)
    switch (clickedID) {
        case "admin-home-page":
            localStorage.setItem("view", "HOME");
            break;
        case "admin-customer-page":
            localStorage.setItem("view", "CUSTOMER");
            break;
        case "admin-employee-page":
            localStorage.setItem("view", "EMPLOYEE");
            break;
        case "admin-supplier-page":
            localStorage.setItem("view", "SUPPLIER");
            break;
        case "admin-item-page":
            localStorage.setItem("view", "ITEM");
            break;
        case "admin-product-page":
            localStorage.setItem("view", "PRODUCT");
            break;
        case "admin-order-page":
            localStorage.setItem("view", "ORDERS");
            break;
        case "admin-order-detail-page":
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
    console.log("Admin "+viewOb.get(0).id);
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
    $("#admin-home-page,#admin-customer-page,#admin-employee-page,#admin-supplier-page,#admin-item-page,#admin-product-page,#admin-order-page,#admin-order-detail-page").css('display','none');
}


$("#admin-home-nav").click(function () {
    setView($("#admin-home-page"));
    adminPanelInitialize();
});

$("#admin-customer-nav").click(function () {
    setView($("#admin-customer-page"));
    customerInitialize();
});

$("#admin-employee-nav").click(function () {
    setView($("#admin-employee-page"));
    employeeInitialize();
});

$("#admin-supplier-nav").click(function () {
    setView($("#admin-supplier-page"));
    supplierInitialize();
});

$("#admin-item-nav").click(function () {
    setView($("#admin-item-page"));
    itemInitialize();
});

$("#admin-product-nav").click(function () {
    setView($("#admin-product-page"));
    productInitialize();
});

$("#admin-order-nav").click(function () {
    placeOrderInitialize();
    setView($("#admin-order-page"));
});

$("#admin-order-detail-nav").click(function () {
    setView($("#admin-order-detail-page"));
    orderDetailInitialize();
});

$("#admin-log-in-nav").click(function () {
    localStorage.setItem("view", "LOG-IN");
    window.location.href = '/shoe-shop-front-end/index.html';
});

$("#admin-sign-up-nav").click(function () {
    localStorage.setItem("view", "SIGN-UP");
    window.location.href = '/shoe-shop-front-end/index.html';
});

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
