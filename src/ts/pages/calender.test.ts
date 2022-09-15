import { Calender } from "./calendar";
import meetings from "../data/meetings";
import attendee from '../data/attendee'


test('' , ()=>{
    const cp = new Calender();
    document.body.innerHTML = `<div class="meet-cont">
       <div class= "m-name" ></div>    
       <div class = "m-attendee"></div>
    </div>`

    const meetingsList = document.querySelector(".meet-cont");
   const mName = document.querySelector('.m-name')
   const mAttendee = document.querySelector('.m-attendee')

    
  //const calenderMeeting = document.querySelector('.meeting') as HTMLElement;

  cp.getMeets(meetings);
  

  for( let i=0; i<meetings.length; i++ ){
    expect( mName?.innerHTML ).toMatch( meetings[i].name );
    //expect( mAttendee?.innerHTML ).toMatch( attendee[i].email );

}

// for( let i=0; i<attendee.length; i++ ){
//     expect( mAttendee?.innerHTML ).toMatch( attendee[i].email );
// }

 expect( meetingsList?.innerHTML ).not.toEqual( '' );



})
