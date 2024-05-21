initiateUI();

function initiateUI() {
    clearAll();
    console.log("Log-in-page")
    console.log(localStorage.getItem("view"))
    $("#log-in-page").css('display', 'block');
    //$("header").css('display', 'none');
    setTheLastView();
}

function setTheLastView() {
    let view = localStorage.getItem("view");
    switch (view) {
        case "LOG-IN":
            setView($("#log-in-page"));
            break;
        case "SIGN-UP":
            setView($("#sign-up-page"));
            break;
        default:
            setView($("#log-in-page"));
    }
}

function saveLastView(clickedID) {
    switch (clickedID) {
        case "log-in-page":
            localStorage.setItem("view", "LOG-IN");
            break;
        case "sign-up-page":
            localStorage.setItem("view", "SIGN-UP");
            break;
    }
}

function setView(viewOb) {
    clearAll();
    viewOb.css("display", "block");
    //$("header").css('display', 'block');
    saveLastView(viewOb.get(0).id);
}

function clearAll() {
    $("#log-in-page,#sign-up-page").css('display','none');
}
$("#link-log-in").click(function () {
    setView($("#log-in-page"));
});

$("#link-sign-up").click(function () {
    setView($("#sign-up-page"));
});