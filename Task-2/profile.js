// form validation 

function validate() {

    var formName = document.getElementById("name");
    var fullName = (formName.value).split(/\s+/).length;
    
    var isNumber = /(^[0-9]{10}$)|(^[0-9]{8}$)/;
    var formNumber = document.getElementById("number");

    var isEmail = /[a-zA-Z0-9]{3,}@.+/;
    var formEmail = document.getElementById("email");
    
    

    if (formName.value == "" || fullName < 2) {
        window.alert("Please enter a valid/full name");
        formName.classList.add("is-invalid");
        
        return false;
    } else if (!formEmail.value.match(isEmail)) {
        window.alert("Please enter a valid email");
        formEmail.classList.add("is-invalid");
        return false;
    } else if (!formNumber.value.match(isNumber)) {
        window.alert("Please enter a valid number");
        formNumber.classList.add("is-invalid");
        return false;
    }

    else {
        return true
    }
}

console.log("Jaascript is connected");