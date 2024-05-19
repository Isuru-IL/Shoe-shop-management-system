$("#btn-sign-up").click(function () {

    let email= $("#txtSignUpEmail").val();
    let firstName= $("#txtSignUpFirstName").val();
    let lastName= $("#txtSignUpLastName").val();
    let password= $("#txtSignUpPassword").val();
    let role= $("#cmbSignUpRole").val();

    let signUpObj = {
        email:email,
        firstName:firstName,
        lastName:lastName,
        password:password,
        role:role
    }

    console.log(signUpObj)

    const jsonObj = JSON.stringify(signUpObj)

    $.ajax({
        url: "http://localhost:8080/api/v1/auth/signUp",
        method: "POST",
        data: jsonObj,
        contentType: "application/json",
        success: function (resp, textStatus, jqxhr) {
            console.log("signUp success: ", resp);
            localStorage.setItem("token", resp.token)
            clearSignUpInputFields();
            swal("SignUp", "Sign up successfully", "success");
            setView($("#log-in-page"));
        },
        error: function (xhr, textStatus, error) {
            console.log("signUp error: ", error);
            console.log("signUp error: ", xhr);
            if (xhr.status===409){
                swal("Error", "This User is already exits!", "error");
            }
            if (xhr.status===404){
                swal("Error", "No Employee can be found this email!", "error");
            }
        }
    })
});

function clearSignUpInputFields() {
    $("#cmbSignUpRole").prop("selectedIndex", "USER");
    $("#txtSignUpEmail").val("");
    $("#txtSignUpFirstName").val("");
    $("#txtSignUpLastName").val("");
    $("#txtSignUpPassword").val("");
    $("#txtSignUpConfirmPassword").val("");
}