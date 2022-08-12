function addPerson( credentials ){
    return fetch (`https://mymeetingsapp.herokuapp.com/api/auth/register`,
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
            console.log(response)

            return "Success";
            
        }
    )
    
}