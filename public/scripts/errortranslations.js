
/*
    Passport local mongoose
    ============================

    register
    ========
    MissingPasswordError 'No password was given'
    UserExistsError 'A user with the given username is already registered'
    MissingUsernameError 'No username was given'
    Email is taken. (custom)


    login
    ========
    AttemptTooSoonError 'Account is currently locked. Try again later'
    TooManyAttemptsError 'Account locked due to too many failed login attempts'
    NoSaltValueStoredError 'Authentication not possible. No salt value stored'
    IncorrectPasswordError 'Password or username are incorrect'
    IncorrectUsernameError 'Password or username are incorrect'
    

*/

function translateregister(error) {
    

  document.addEventListener('DOMContentLoaded', function () {
    var emailInput = document.getElementById('email');
    var usernameInput = document.getElementById('username');
    var passwordInput = document.getElementById('password');

    var erroremail = document.getElementById("erroremail");
    var errorusername = document.getElementById("errorusername");
    var errorpassword = document.getElementById("errorpassword");

    //email
    if (error == "Email is taken.") {
        emailInput.className = "input is-danger";
        erroremail.innerHTML = "Email is taken.";
    }


    //username 
    if (error == "MissingUsernameError: No username was given") {
        usernameInput.className = "input is-danger";
        errorusername.innerHTML = "No username was given.";
    }
    if (error == "UserExistsError: A user with the given username is already registered") {
        usernameInput.className = "input is-danger";
        errorusername.innerHTML = "Username is already registered."
    }

    //password 
    if (error == "MissingPasswordError: No password was given") {
        passwordInput.className = "input is-danger";
        errorpassword.innerHTML = "No username was given.";
    }


   })
}

function translatelogin(error){
    



  document.addEventListener('DOMContentLoaded', function () {
   
    var usernameInput = document.getElementById('username');
    var passwordInput = document.getElementById('password');

    var errorelement = document.getElementById("error");
    

    
    if (error == "AttemptTooSoonError: Account is currently locked. Try again later"){
        usernameInput.className = "input is-danger";
        passwordInput.className = "input is-danger";
        errorelement.innerHTML = "Account is currently locked. Try again later.";
    }
    if (error == "TooManyAttemptsError: Account locked due to too many failed login attempts"){
        usernameInput.className = "input is-danger";
        passwordInput.className = "input is-danger";
        errorelement.innerHTML = "Account locked due to too many failed login attempts.";
    }
    if (error == "NoSaltValueStoredError: Authentication not possible. No salt value stored"){
        usernameInput.className = "input is-danger";
        passwordInput.className = "input is-danger";
        errorelement.innerHTML = "Authentication not possible. No salt value stored.";
    }

    // for security reasons you dont tell the user if its their user or pass that is wrong.
    if (error == "IncorrectPasswordError: Password or username are incorrect"){
        usernameInput.className = "input is-danger";
        passwordInput.className = "input is-danger";
        errorelement.innerHTML = "Password or username are incorrect.";
    }
    
    if (error == "IncorrectUsernameError: Password or username are incorrect"){
        usernameInput.className = "input is-danger";
        passwordInput.className = "input is-danger";
        errorelement.innerHTML = "Password or username are incorrect.";
    }
    
  })


}
