(function(){
    let RegistrationForm;
    let usernameEl; 
    let passwordEl ;
    let nameEl; 
    let confirmPasswordEl; 


    function addEventListener(){
        RegistrationForm.addEventListener('submit' , function(event){
            event.preventDefault();

            nameEl = document.getElementById('name');
            usernameEl = document.getElementById('email');
            passwordEl = document.getElementById('password');
            confirmPasswordEl = document.getElementById('confirmpassword');



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

            function validateConfirmPassword() {
                const password = passwordEl.value.trim();
                const confirmPassword = confirmPasswordEl.value.trim();
                const formGroupEl = confirmPasswordEl.closest('.form-group');
                const messageEl = formGroupEl.querySelector('.message');

                let error = '';

                if (password !== confirmPassword) {
                    error += 'Password and confirm password must match';
                }

                messageEl.innerHTML = error;
            }


            usernameEl.addEventListener('blur', validateUsername);
            usernameEl.addEventListener('input', validateUsername);

            passwordEl.addEventListener('blur', validatePassword);
            passwordEl.addEventListener('input', validatePassword);

            confirmPasswordEl.addEventListener('blur', validateConfirmPassword);
            confirmPasswordEl.addEventListener('input',validateConfirmPassword);



            const credential = {
                name : nameEl.value.trim(),
                email : usernameEl.value.trim(),
                password : passwordEl.value.trim(),
       //         confirmPassword : confirmPasswordEl.value.trim()
            }

            addPerson(credential)
                .then(
                    function(registerResponse){
                        console.log(registerResponse)
                        window.location.href = 'login.html';
                    }
                )
                .catch(
                    function( error ) {
                        alert( error.message );
                    }
                );

        })
    }

    window.addEventListener('load' , function(){
        RegistrationForm = document.getElementById('register-form');
        addEventListener();
    })
}
)();



