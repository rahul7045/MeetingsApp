import { loginUser } from '../services/auth-login';
class Login {
    constructor() {
        this.LogDetails = null;
        this.addEventListener = () => {
            this.LogDetails.addEventListener('submit', function (event) {
                event.preventDefault();
                const creds = {
                    email: document.getElementById("email").value.trim(),
                    password: document.getElementById("password").value.trim(),
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
        };
        this.load = () => {
            this.LogDetails = document.getElementById('login-form');
            this.addEventListener();
        };
    }
}
;
export { Login };
//# sourceMappingURL=login.js.map