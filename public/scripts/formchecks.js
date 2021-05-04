// Function applied on form to prevent a POST if input is invalid
function dashboard() {
    var inputText = document.getElementById('glucoseInput');
    if (inputText.value.length == 0){
        event.preventDefault();
        alert("Please enter a blood sugar value.");
    }
    else if (isNaN(inputText.value)) {
        event.preventDefault();
        alert("Please enter a blood sugar value.")
    }
    else if (inputText.value < 0) {
        event.preventDefault();
        alert("Blood sugar value must be a postive number");
    }
}

function registration(){

    //firstname
    var firstnameInput = document.getElementById('firstname');
    var errorfirstname = document.getElementById("errorfirstname");

    if (firstnameInput.value.length == 0 ){
        event.preventDefault();
        firstnameInput.className = "input is-danger";
        errorfirstname.innerHTML = "Enter first name.";
    }
    else {
        firstnameInput.className = "input";
        errorfirstname.innerHTML = '';

    }

    
    //lastname
    var lastnameInput = document.getElementById('lastname');
    var errorlastname = document.getElementById("errorlastname");

    if (lastnameInput.value.length == 0 ){
        event.preventDefault();
        lastnameInput.className = "input is-danger";
        errorlastname.innerHTML = "Enter last name.";
        
    }
    else {
        lastnameInput.className = "input";
        errorlastname.innerHTML = '';

    }



    //email
    var emailInput = document.getElementById('email');
    var erroremail = document.getElementById("erroremail");
    emailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (emailInput.value.length == 0 ){
        event.preventDefault();
        emailInput.className = "input is-danger";
        erroremail.innerHTML = "Enter an email address.";  
    }
    else if(!emailInput.value.match(emailregex)){
        event.preventDefault();
        emailInput.className = "input is-danger";
        erroremail.innerHTML = "Invalid email.";
    }
    else{
        emailInput.className = "input";
        erroremail.innerHTML = '';
    }



    //age
    var ageInput = document.getElementById('age');
    var errorage = document.getElementById("errorage");

    if (ageInput.value.length == 0 ){
        event.preventDefault();
        ageInput.className = "input is-danger";
        errorage.innerHTML = "Enter a age.";
    }
    else if (isNaN(ageInput.value)) {
        event.preventDefault();
        ageInput.className = "input is-danger";
        errorage.innerHTML = "Age must be a number.";
    }
    else if (ageInput.value < 0) {
        event.preventDefault();
        ageInput.className = "input is-danger";
        errorage.innerHTML = "Age must be a postive number.";
    }
    else{
        ageInput.className = "input";
        errorage.innerHTML = '';
    }



    //diagnosis
    var diagnosisInput = document.getElementById('diabetic');
    var diagnosisDiv = document.getElementById('diabeticdiv');
    var errordiagnosis = document.getElementById("errordiabetic");

    if (diagnosisInput.selectedIndex == 0){
        event.preventDefault();
        diagnosisDiv.className = "select is-danger";
        errordiagnosis.innerHTML = "Select an option.";
    }
    else{
        diagnosisDiv.className = "select";
        errordiagnosis.innerHTML = '';
    }



    //username 
    var usernameInput = document.getElementById('username');
    var errorusername = document.getElementById("errorusername");

    if (usernameInput.value.length == 0 ){
        event.preventDefault();
        usernameInput.className = "input is-danger";
        errorusername.innerHTML = "Enter a username.";
    }
    
    else{
        usernameInput.className = "input";
        errorusername.innerHTML = '';
    }

    

    //password
    var passwordInput = document.getElementById('password');
    var errorpassword = document.getElementById("errorpassword");

    if(passwordInput.value.length == 0){
        event.preventDefault();
        passwordInput.className = "input is-danger";
        errorpassword.innerHTML = "Enter a password."
    }
    else{
        passwordInput.className = "input";
        errorpassword.innerHTML = '';
    }



}


function login(){


    var errorelement = document.getElementById("error");


    //username 
    var usernameInput = document.getElementById('username');

    if (usernameInput.value.length == 0 ){
        event.preventDefault();
        usernameInput.className = "input is-danger";
        errorelement.innerHTML = "Enter a username or password.";
    }
    
    else{
        usernameInput.className = "input";
        errorelement.innerHTML = '';
    }



    //password
    var passwordInput = document.getElementById('password');

    if(passwordInput.value.length == 0){
        event.preventDefault();
        passwordInput.className = "input is-danger";
        errorelement.innerHTML = "Enter a username or password."
    }
    else{
        passwordInput.className = "input";
        errorelement.innerHTML = '';
    }




}