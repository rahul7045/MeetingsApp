import { loginUser } from '../services/auth-login';

class Login {
   LogDetails : HTMLElement | null = null;

  addEventListener =() => {
    ( this.LogDetails as HTMLFormElement ).addEventListener( 'submit', function( event ) {
      event.preventDefault();

      const creds = {

        email: (document.getElementById("email") as HTMLInputElement).value.trim(),

        password: (document.getElementById("password") as HTMLInputElement).value.trim(),

      };
      loginUser(creds)
        .then(function (loginResponse) {
          console.log(loginResponse);
          window.location.href = "../screens/calendar.html";
        })
        
        .catch(function (error) {
          alert(error.response);
        });
    });
  }


  load = () => {
    this.LogDetails = document.getElementById( 'login-form' ) as HTMLFormElement;
    
    this.addEventListener();
}
}; 

export {Login}
