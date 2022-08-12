const getMeetings = function(){
     return fetch( ` https://mymeetingsapp.herokuapp.com/api/calendar?date= {date} ` ,
            {
            headers : {       
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
