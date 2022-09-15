import {loginUser} from "./auth-login";

import "../../scss/pages/loginRegister.scss";
class LoginValidation {
  //loginForm: HTMLFormElement | null = null;
  loginForm = document.getElementById("login-form") as HTMLFormElement;
  passwordEl = document.querySelector("#login-password") as HTMLInputElement;
  emailEl=document.querySelector('#login-email') as HTMLInputElement;

  validateEmail=()=> {

    const email = this.emailEl.value.trim();
    const formGroupEl = this.emailEl.closest(".form-group") as HTMLElement;
    const messageEl = formGroupEl.querySelector(".message") as HTMLInputElement;
  
    let error = "";
  
    if (!email) {
      // empty string is considered as false
      error += "<div>Email cannot be empty</div>";
    }
    messageEl.innerHTML = error;
    return error === ""; // true for no error / false if input has errors
  }

  validatePassword=()=> {
    const password = this.passwordEl.value.trim();
    const formGroupEl = this.passwordEl.closest(".form-group") as HTMLFormElement;
    const messageEl = formGroupEl.querySelector(".message") as HTMLSpanElement;

    let error = "";
    if (!password) {
      error += "<div>Please enter your password</div>";
    }
    messageEl.innerHTML = error;
  }

  addEventListeners = () => {    
        this.passwordEl.addEventListener("blur", this.validatePassword);
        this.passwordEl.addEventListener("input", this.validatePassword);

        this.emailEl.addEventListener("blur",this.validateEmail);
        this.emailEl.addEventListener("input",this.validateEmail);

        this.loginForm.addEventListener('submit',function(event){
            const credentials = {
                email: (
                  document.getElementById("login-email") as HTMLInputElement).value.trim(),
                password: (document.getElementById("login-password") as HTMLInputElement).value.trim(),
              };
              loginUser(credentials)
          .then(function (loginResponse) {
            console.log(loginResponse);
            window.location.href = "./calendar.html";
          })
          .catch(function (error) {
            alert("Incorrect Password!! Please enter your correct Password");
          });
        })   
    }
    load = () => {
        this.loginForm = document.getElementById("login-form") as HTMLFormElement;
        this.addEventListeners();
      };
  }
  

export {LoginValidation};