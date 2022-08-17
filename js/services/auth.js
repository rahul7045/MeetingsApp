function login( credentials ){
    return fetch (`https://mymeetingsapp.herokuapp.com/api/auth/login`,
    {
        method : 'POST',
        body: JSON.stringify( credentials ),
        headers: {
            "Content-Type": "application/json"
        },

    })
    .then(
        function( response ) {
            if (!response.ok) {
                throw new Error(response.statusText);
            }

            return response.json();
        }
    )
    .then(
        function(loginResponse){
            localStorage.setItem('email' , loginResponse.email );
            localStorage.setItem('token' , loginResponse.token );
            localStorage.setItem('name' , loginResponse.name );

            return loginResponse

        }
    );
}

function logout(){
    localStorage.clear();
}

function getToken(){
    return localStorage.getItem('token');
}