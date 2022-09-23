import  {addMeeting , getMeetings , filterMeetings , excuseYourself , addAttendee} from '../services/get-meetings';
import '../../scss/pages/tab.scss';
import { displayFilter } from './display-filter-meetings';
import opentab from './tab';
import addMeetingValidation from '../services/add-meeting-validation';
import init from './nav-menu';

//import '../services/formValidation'
class Meeting {
    //addMeetingForm : HTMLElement | null = null;
    addMeetingForm : HTMLElement = document.getElementById( "add-meeting-form" ) as HTMLElement;

    addEventListeners =() =>{
        this.addMeetingForm.addEventListener( "submit", function ( event ) {
  
            event.preventDefault();

            const start  = ( document.getElementById( "start-time" ) )  as HTMLInputElement ;
            const end = ( document.getElementById( "end-time" ) ) as HTMLInputElement;

            const meeting = {
                name: ( document.getElementById( "meeting-name" ) as HTMLInputElement ).value.trim(),
                description: ( document.getElementById( "description" ) as HTMLInputElement ).value.trim(),
                date: ( document.getElementById( "date" ) as HTMLInputElement ).value,
                startTime: {
                    hours: parseInt( start.value[0] + start.value[1] ) ,
                    minutes: parseInt( start.value[3] + start.value[4] )
                },
                endTime: {
                    hours: parseInt( end.value[0] + end.value[1] ),
                    minutes: parseInt( end.value[3] + end.value[4] )
                },
                attendees: [
                    "rahul@example.com"
                ]
            };

            addMeeting( meeting )
                .then( function ( addMeetingResponse ) {
                    console.log( addMeetingResponse );
                } )
                .catch( function ( error ) {
                    alert( error.response );
                } );
        } );
    }
    defaultOpen() {
        ( document.getElementById( "default-open" ) as HTMLElement ).click();
    }
    load =() =>{

        const x = new displayFilter();
        x.load();
    
  

        init();
        const user : HTMLElement = document.getElementById( "user" ) as HTMLElement;
        user.textContent = ` ${localStorage.getItem( "email" )}`;
        //this.addEventListeners();
    
        const e = new addMeetingValidation();
        e.load();
   

        // var tab2 = new displayFilter();
        //   tab2.showSearchMeetings();

        const tabLink1 = document.querySelector( "#default-open" );
        ( tabLink1 as HTMLElement ).addEventListener( "click", ( event ) => {
            opentab( event, "filter" );
            const tab2 = new displayFilter();
            tab2.showSearchMeetings();
        } );
        const tabLink2 = document.querySelector( "#add-open" );
        ( tabLink2 as HTMLElement ).addEventListener( "click", ( event ) => {
            opentab( event, "add" );
            this.addEventListeners();
        } );
    
        this.defaultOpen();
    }

}

export {Meeting}