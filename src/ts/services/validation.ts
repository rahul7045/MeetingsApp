import { register } from "./auth-reg";
import "../../scss/pages/loginRegister.scss";
class RegisterValidation {
    passwordEl = document.querySelector( "#password" ) as HTMLInputElement;
    confirmPasswordEl = document.querySelector(
        "#confirm-password"
    ) as HTMLInputElement;
    emailEl = document.querySelector( "#email" ) as HTMLInputElement;
    usernameEl = document.querySelector( "#name" ) as HTMLInputElement;
    form = document.querySelector( "#register-form" ) as HTMLFormElement;

    validateUsename = () => {
        const username = this.usernameEl.value.trim();
        const formGroupEl = this.usernameEl.closest( ".form-group" ) as HTMLElement;
        const messageEl = formGroupEl.querySelector( ".message" ) as HTMLInputElement;
        let error = "";
        if ( username.length < 4 ) {
            error += "Username must be at least 4 characters long";
        }
        messageEl.textContent = error;
        return error === "";
    };

    validatePassword = () => {
        const password = this.passwordEl.value.trim();
        const formGroupEl = this.passwordEl.closest( ".form-group" ) as HTMLElement;
        const messageEl = formGroupEl.querySelector( ".message" ) as HTMLInputElement;

        let error = "";

        if ( !password ) {
            // empty string is considered as false
            error += "<div>Password cannot be empty</div>";
        } else {
            // uppercase
            const uppercasePat = /[A-Z]/;
            if ( !uppercasePat.test( password ) ) {
                error += "<div>Password must have an uppercase character</div>";
            }

            // lowercase
            const lowercasePat = /[a-z]/;
            if ( !lowercasePat.test( password ) ) {
                error += "<div>Password must have a lowercase character</div>";
            }

            /* digit */
            const digitPat = /[0-9]/;
            if ( !digitPat.test( password ) ) {
                error += "<div>Password must have a digit</div>";
            }

            /* special characters */
            const specialPat = /[!@#$%^&*()]/;
            if ( !specialPat.test( password ) ) {
                error += "<div>Password must have a special character</div>";
            }
        }

        messageEl.innerHTML = error;

        return error === "";
    };

    validateConfirmPassword = () => {
        const password = this.passwordEl.value.trim();
        const confirmPassword = this.confirmPasswordEl.value.trim();
        const formGroupEl = this.confirmPasswordEl.closest(
            ".form-group"
        ) as HTMLElement;
        const messageEl = formGroupEl.querySelector( ".message" ) as HTMLInputElement;

        let error = "";

        if ( password !== confirmPassword ) {
            error += "Password and confirm password must match";
        }

        messageEl.innerHTML = error;

        return error === "";
    };
    validateEmail = () => {
    // for event listeners, this -> element where event happens (usernameEl)
    //console.log("this = ", this);

        const email = this.emailEl.value.trim();
        const formGroupEl = this.emailEl.closest( ".form-group" ) as HTMLElement;
        const messageEl = formGroupEl.querySelector( ".message" ) as HTMLInputElement;

        let error = "";

        if ( !email ) {
            // empty string is considered as false
            error += "<div>Email cannot be empty</div>";
        }

        messageEl.innerHTML = error;

        return error === ""; // true for no error / false if input has errors
    };
    validate = () => {
        let isValid = true;

        isValid = this.validateUsename() && isValid;
        isValid = this.validateEmail() && isValid;
        isValid = this.validatePassword() && isValid;
        isValid = this.validateConfirmPassword() && isValid;

        return isValid;
    };
    addEventListeners = () => {
        this.emailEl.addEventListener( "blur", this.validateEmail );
        this.emailEl.addEventListener( "input", this.validateEmail );

        this.passwordEl.addEventListener( "blur", this.validatePassword );
        this.passwordEl.addEventListener( "input", this.validatePassword );

        this.passwordEl.addEventListener( "blur", this.validateConfirmPassword );
        this.passwordEl.addEventListener( "input", this.validateConfirmPassword );

        this.confirmPasswordEl.addEventListener(
            "blur",
            this.validateConfirmPassword
        );
        this.confirmPasswordEl.addEventListener(
            "input",
            this.validateConfirmPassword
        );

        this.usernameEl.addEventListener( "blur", this.validateUsename );
        this.usernameEl.addEventListener( "input", this.validateUsename );

        // this.form.addEventListener("submit",(event)=> {
        //   event.preventDefault();

        //   const email = this.emailEl.value.trim();
        //   const username=this.usernameEl.value.trim();
        //   const password=this.passwordEl.value.trim();

        //    const credentials = {
        //      name: username,
        //      email: email,
        //      password: password,
        //    };

        //   // if (this.validate()) {
        //   //   this.form.submit();
        //   //   this.form.reset();
        //   //   //validate();
        //   // } else {
        //   //   alert(Response);
        //   // }
        //   if (this.validate()) {
        //     register(credentials)
        //       .then(function (loginResponse) {
        //         console.log(loginResponse);
        //         window.alert("You have been successfully registered");
        //         window.location.href = "./login.html";
        //       })
        //       .catch(function (error) {
        //         alert('Account already exsists');
        //        });
        //    }
        // });

    };
    load = () => {
        this.form = document.querySelector( "#register-form" ) as HTMLFormElement;
        this.addEventListeners();
    };
}

export { RegisterValidation };
