import { AddMeeting } from '../models/AddMeeting'

function addMeeting( newMeeting : AddMeeting ) {
  
    return fetch( `https://mymeetingsapp.herokuapp.com/api/meetings`, {
        method: "POST",
        body: JSON.stringify( newMeeting ),
        headers: {
            Authorization: `${localStorage.getItem( `token` )}`,
            "Content-Type": "application/json"
        }
    } )

        .then( function ( response ) {
            if ( !response.ok ) {
         
                throw new Error( response.statusText );
            }
            console.log( localStorage.getItem( `token` ) )
            return response.json();
        } )

        .then( function ( addMeetingResponse ) {
            window.alert( "Meeting is added successfully" );
            console.log( addMeetingResponse.description );
            return addMeetingResponse;
        } );

} 

export {addMeeting};