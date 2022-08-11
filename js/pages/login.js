(function(){
    let loginForm;
    let usernameEl; 
    let passwordEl ;

    function addEventListener(){
        loginForm.addEventListener('submit' , function(event){
            event.preventDefault();

            usernameEl = document.getElementById('email');
            passwordEl = document.getElementById('password');



            function validateUsername() {
                // for event listeners, this -> element where event happens (usernameEl)

                const username = this.value.trim();
                const formGroupEl = this.closest('.form-group');
                const messageEl = formGroupEl.querySelector('.message');

                let error = '';

                if (username.length < 8) {
                    error +=
                        '<div>Username must be at least 8 characters long</div>';
                }

                messageEl.innerHTML = error;
            }


            function validatePassword() {
                const password = this.value.trim();
                const formGroupEl = this.closest('.form-group');
                const messageEl = formGroupEl.querySelector('.message');

                let error = '';

                if (!password) {
                    error += '<div>Password cannot be empty</div>';
                }

                const uppercasePat = /[A-Z]/;
                if (!uppercasePat.test(password)) {
                    error +=
                        '<div>Password must have an uppercase character</div>';
                }

                const lowercasePat = /[a-z]/;
                if (!lowercasePat.test(password)) {
                    error +=
                        '<div>Password must have a lowercase character</div>';
                }

                messageEl.innerHTML = error;
            }

            usernameEl.addEventListener('blur', validateUsername);
            usernameEl.addEventListener('input', validateUsername);

            passwordEl.addEventListener('blur', validatePassword);
            passwordEl.addEventListener('input', validatePassword);

            const credential = {
                email : usernameEl.value.trim(),
                password : passwordEl.value.trim()
            }

            login(credential)
                .then(
                    function(loginResponse){
                        return console.log(loginResponse)
                    }
                )
                .catch(
                    function( error ) {
                        alert( error.response );
                    }
                );

        })
    }

    window.addEventListener('load' , function(){
        loginForm = document.getElementById('login-form');
        addEventListener();
    })
}
)();



