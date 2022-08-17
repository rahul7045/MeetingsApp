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


//add meetings

const addMeeting = function(meeting){
    const meetingStr = JSON.stringify(meeting );
    console.log( meetingStr );

    return fetch (
        `https://mymeetingsapp.herokuapp.com/api/meetings` ,
        {
            method : 'POST' ,
            body : meetingStr ,
            headers : {
                "Content-Type": "application/json",
                'Authorization': `${getToken()}`
            }

        }
    )
    .then(
        function( response ) {
            if (!response.ok) {
                // for 404 kind of errors, we should check and explcitly throw an error
                throw new Error(response.statusText);
            }

           console.log(response);
           return "Success";
        }
    )
};

//get teams\

const getTeams = function(){
    return fetch( `https://mymeetingsapp.herokuapp.com/api/teams` ,
           {
            //method : 'GET' ,
           headers : {    
            'Authorization': getToken() ,
            //'Content-Type' : "application/json",  
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
};

// get filter meetings
const getFilterMeeting = function(period , searchEl){
    return fetch( `https://mymeetingsapp.herokuapp.com/api/meetings?period=${period}&search-for="${searchEl}"` ,
    {

        headers : {
            'Authorization': getToken() ,
            "Content-Type": "application/json",


        }
    } )
    .then(
        function(response){
            if(!response.ok){
                throw new Error(response.statusText);
            }
            return response.json();
        }
    )
}

const addTeams = function(data){
    const teamStr = JSON.stringify(data );
   // console.log( teamStr );

    return fetch (
        `https://mymeetingsapp.herokuapp.com/api/teams` ,
        {
            method : 'POST' ,
            body : teamStr ,
            headers : {
                "Content-Type": "application/json",
                'Authorization': `${getToken()}`
            }

        }
    )
    .then(
        function( response ) {
            if (!response.ok) {
                // for 404 kind of errors, we should check and explcitly throw an error
                throw new Error(response.statusText);
            }

           console.log(response);
           return "Success";
        }
    )
}


//delete teams

const deleteTeams = function(teamId){
    return fetch(
        `https://mymeetingsapp.herokuapp.com/api/teams/${teamId}?action=remove_member`,
        {
            method:'PATCH',
            headers:{
                'Authorization': getToken()
            }
        }
    ).then(
        function( response ) {
            if( !response.ok ) {
                throw new Error( response.statusText );
            }

            // The response is empty (status code 204). So we do not call response.json() and instead pass on a hard-coded string to indicate success
            return 'Success';
        }
    )
}

const deleteMeetings =  function(meetingId){
    return fetch(
        `https://mymeetingsapp.herokuapp.com/api/meetings/${meetingId}?action=remove_attendee`,
        {
            method:'PATCH',
            headers:{
                'Authorization': getToken()
            }
        }
    ).then(
        function( response ) {
            if( !response.ok ) {
                throw new Error( response.statusText );
            }

            // The response is empty (status code 204). So we do not call response.json() and instead pass on a hard-coded string to indicate success
            return 'Success';
        }
    )
}
