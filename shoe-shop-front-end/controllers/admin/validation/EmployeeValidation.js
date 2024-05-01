const EMP_NAME_REGEX = /^[A-Za-z ]{5,}$/;
const EMP_ADDRESS_REGEX = /^[A-Za-z0-9 ]{5,}$/;
const EMP_ADDRESS_NO_REGEX = /^(?:no\.|No\.)\d+$/i
const EMP_EMAIL_REGEX =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMP_PHONE_REGEX = /^\d{10}$/;

let empValidation = [];
empValidation.push({field:$("#txtEmpName"),regEx: EMP_NAME_REGEX});
empValidation.push({field:$("#txtEmpEmail"),regEx: EMP_EMAIL_REGEX});
empValidation.push({field:$("#txtEmpAddLine01"),regEx: EMP_ADDRESS_NO_REGEX});
empValidation.push({field:$("#txtEmpAddLine02"),regEx: EMP_ADDRESS_REGEX});
empValidation.push({field:$("#txtEmpContact"),regEx: EMP_PHONE_REGEX});
empValidation.push({field:$("#txtEmpEmgContact"),regEx: EMP_PHONE_REGEX});
empValidation.push({field:$("#txtEmpGuardianName"),regEx: EMP_NAME_REGEX});

setEmployeeBtn();

$("#txtEmpName,#txtEmpEmail,#txtEmpAddLine01,#txtEmpAddLine02,#txtEmpContact,#txtEmpEmgContact,#txtEmpGuardianName").on("keydown keyup", function (e) {
    let indexNo = empValidation.indexOf(empValidation.find((c) => c.field.attr("id") === e.target.id));

    if(e.key==="Tab"){
        e.preventDefault();
    }
    checkValidations(empValidation[indexNo]);
    setEmployeeBtn()
})


function checkValidations(object) {
    if (object.regEx.test(object.field.val())) {
        setEmployeeBorder(true, object);
        return true;
    }
    setEmployeeBorder(false, object);
    return false;
}
function checkAllEmployees() {
    for (let i = 0; i < empValidation.length; i++) {
        if (!checkValidations(empValidation[i])){
            return false;
        }

    }
    return true;
}

function setEmployeeBorder(bol, ob) {
    if (!bol) {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "2px solid red");
        } else {
            ob.field.css("border", "1px solid rgb(206, 212, 218)");
        }
    } else {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "1px solid rgb(206, 212, 218)");
        } else {
            ob.field.css("border", "1px solid rgb(206, 212, 218)");

            //ob.field.css("border", "var(--bs-border-width) solid var(--bs-border-color)");
        }
    }
}


function setEmployeeBtn() {
    if (checkAllEmployees()) {
        $("#btnEmpSave").prop("disabled", false);
        $("#btnEmpUpdate").prop("disabled", false);
        $("#btnEmpDelete").prop("disabled", false);

    } else {
        $("#btnEmpSave").prop("disabled", true);
        $("#btnEmpUpdate").prop("disabled", true);
        $("#btnEmpDelete").prop("disabled", true);
    }
}