import { register } from '../services/auth-reg';
class Register {
    constructor() {
        // let Register;
        //  Register = document.getElementById("register-form");
        this.registerForm = null;
        this.addEventListeners = () => {
            this.registerForm.addEventListener("submit", function (event) {
                event.preventDefault();
                const user = {
                    name: document.getElementById("name").value.trim(),
                    email: document.getElementById("email").value.trim(),
                    password: document.getElementById("password").value.trim(),
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
        };
        this.load = () => {
            this.registerForm = document.getElementById("register-form");
            this.addEventListeners();
        };
    }
}
;
export { Register };
//# sourceMappingURL=register.js.map