let txtLogEmail=$("#txtLogInEmail");
let txtLogPassword=$("#txtLogInPassword");
$("#btn-log-in").click(function () {
    if (checkEmptyLogInInputs()){
        let email=txtLogEmail.val();
        let password=txtLogPassword.val();

        let logInObj={
            email:email,
            password:password
        }

        const jsonObj=JSON.stringify(logInObj);
        console.log(jsonObj)
        $.ajax({
            url: "http://localhost:8080/api/v1/auth/signIn",
            method: "POST",
            data: jsonObj,
            contentType: "application/json",
            success:function (resp, textStatus, jqxhr) {
                console.log("logIn success: ", resp);
                localStorage.setItem("token", resp.token)
                clearLogInInputFields();
                window.location.href = '../assets/pages/admin.html';
                swal("Log In", "Log In successfully", "success");
            },
            error: function (xhr, textStatus, error) {
                console.log("logIn error: ", error);
                console.log("logIn error: ", xhr);
                if (xhr.status===401){
                    swal("Error", "Incorrect Password!", "error");
                }
                if (xhr.status===404){
                    swal("Error", "User email is not found", "error");
                }
            }
        });
    }
});

function checkEmptyLogInInputs() {
    if (txtLogEmail.val()==="" || txtLogPassword.val()===""){
        if (txtLogEmail.val()==="" && txtLogPassword.val()===""){
            txtLogEmail.css("border", "2px solid red");
            txtLogPassword.css("border", "2px solid red");
        } else if(txtLogEmail.val()===""){
            txtLogEmail.css("border", "2px solid red");
        } else if (txtLogPassword.val()===""){
            txtLogPassword.css("border", "2px solid red");
        }
        return false;
    }
    return true;
}
function clearLogInInputFields() {
    txtLogEmail.val("");
    txtLogPassword.val("");
}