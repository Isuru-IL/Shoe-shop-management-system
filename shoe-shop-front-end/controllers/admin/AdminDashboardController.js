initiateUI();

function initiateUI() {
    clearAll();
    console.log("Admin-page")
    $("#admin-home-page").css('display', 'block');
    //$("header").css('display', 'none');
    setTheLastView();
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
        /*case "ITEM":
            setView($("#item-page"));
            break;
        case "ORDERS":
            setView($("#order-page"));
            break;
        case "ORDER-DETAILS":
            setView($("#order-detail-page"));
            break;
        case "LOG-IN":
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
        /*case "item-page":
            localStorage.setItem("view", "ITEM");
            break;
        case "order-page":
            localStorage.setItem("view", "ORDERS");
            break;
        case "order-detail-page":
            localStorage.setItem("view", "ORDER-DETAILS");
            break;
        case "log-in-page":
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
    $("#admin-home-page,#admin-customer-page,#admin-employee-page").css('display','none');
}


$("#admin-home-nav").click(function () {
    setView($("#admin-home-page"));
});

$("#admin-customer-nav").click(function () {
    setView($("#admin-customer-page"));
    customerInitialize();
});

$("#admin-employee-nav").click(function () {
    setView($("#admin-employee-page"));
    employeeInitialize();
});

/*$("#item-nav").click(function () {
    setView($("#item-page"));
    itemInitialize();
});

$("#order-nav").click(function () {
    placeOrderInitialize();
    setView($("#order-page"));
});

$("#order-detail-nav").click(function () {
    setView($("#order-detail-page"));
    orderDetailInitialize();
});

$("#log-in-nav").click(function () {
    setView($("#log-in-page"));
});

$("#sign-up-nav").click(function () {
    setView($("#sign-up-page"));
});*/