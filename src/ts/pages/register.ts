import '../../scss/pages/LoginRegister.scss';

import { register } from '../services/auth-reg';

class Register  {
  // let Register;
  //  Register = document.getElementById("register-form");
  registerForm : HTMLElement | null = null;

   addEventListeners =() => {
    (this.registerForm as HTMLElement).addEventListener("submit", function (event) {
      
       event.preventDefault();
      

      const user = {
        name: (document.getElementById("name") as HTMLFormElement).value.trim(),
        email: (document.getElementById("email") as HTMLFormElement).value.trim(),
        password: (document.getElementById("password") as HTMLFormElement).value.trim(),
      };
    
      register(user)
        .then(function (registerResponse) {
          window.alert("registered successfully");
          console.log(registerResponse);
          return registerResponse;
        })
        .catch(function (error) {
          alert(error.response);
        });
    });
  }

  load = () => {
    this.registerForm = document.getElementById("register-form");

    this.addEventListeners();
  };
};

export {Register}