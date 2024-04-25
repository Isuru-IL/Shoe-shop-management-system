initiateUI();

function initiateUI() {
    clearAll();
    console.log("Log-in-page")
    $("#log-in-page").css('display', 'block');
    //$("header").css('display', 'none');
    //setTheLastView();
}

function setTheLastView() {
    let view = localStorage.getItem("view");
    switch (view) {
       /* case "HOME":
            setView($("#home-page"));
            break;
        case "CUSTOMER":
            setView($("#customer-page"));
            break;
        case "ITEM":
            setView($("#item-page"));
            break;
        case "ORDERS":
            setView($("#order-page"));
            break;
        case "ORDER-DETAILS":
            setView($("#order-detail-page"));
            break;*/
        case "LOG-IN":
            setView($("#log-in-page"));
            break;
        case "SIGN-UP":
            setView($("#sign-up-page"));
            break;
        default:
            setView($("#home-page"));
    }
}

function saveLastView(clickedID) {
    switch (clickedID) {
        /*case "home-page":
            localStorage.setItem("view", "HOME");
            break;
        case "customer-page":
            localStorage.setItem("view", "CUSTOMER");
            break;
        case "item-page":
            localStorage.setItem("view", "ITEM");
            break;
        case "order-page":
            localStorage.setItem("view", "ORDERS");
            break;
        case "order-detail-page":
            localStorage.setItem("view", "ORDER-DETAILS");
            break;*/
        case "log-in-page":
            localStorage.setItem("view", "LOG-IN");
            break;
        case "sign-up-page":
            localStorage.setItem("view", "SIGN-UP");
            break;
    }
}

function setView(viewOb) {
    if (viewOb.get(0).id === "log-in-page" || viewOb.get(0).id === "sign-up-page"){
        clearAll();
        viewOb.css("display", "block");
        //$("header").css('display', 'none');
        saveLastView(viewOb.get(0).id);
    }else {
        clearAll();
        viewOb.css("display", "block");
        //$("header").css('display', 'block');
        saveLastView(viewOb.get(0).id);
    }
}

function clearAll() {
    // $("#home-page,#customer-page,#item-page,#order-page,#order-detail-page,#log-in-page,#sign-up-page").css('display','none');
    $("#home-page,#log-in-page,#sign-up-page").css('display','none');
}


/*$("#home-nav").click(function () {
    setView($("#home-page"));
});

$("#customer-nav").click(function () {
    setView($("#customer-page"));
    customerInitialize();
});

$("#item-nav").click(function () {
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

$("#btn-log-in").click(function () {
    window.location.href = '../assets/pages/admin.html';
    //setView($("#home-page"));
    /*if (checkLogInUserDetails()) {
        setView($("#home-page"));
    }*/
});

$("#btn-sign-up").click(function () {
    setView($("#log-in-page"));
    /*if (checkSignUpUserDetails()) {
        setView($("#log-in-page"));
    }*/
});

$("#link-log-in").click(function () {
    setView($("#log-in-page"));
});

$("#link-sign-up").click(function () {
    setView($("#sign-up-page"));
});