const getMeetings = function(date){
     return fetch( `https://mymeetingsapp.herokuapp.com/api/calendar?date=${date}` ,
            {
            headers : {     
                'Content-Type' : `application/json` ,  
                'Authorization': `${getToken()}`
            }
            }
     )
     .then(
        function(response){
            if(!response.ok){
                throw new Error(response.statusText)
            }
            return response.json();
        }
     );
}
