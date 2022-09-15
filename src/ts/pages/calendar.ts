import '../../scss/pages/calendar.scss'

import { Meeting } from "../models/Meetings";
import { Meetings } from "../services/get-calendar";
import init from './nav-menu'
class Calender {

   getMeets(meetings : Meeting[]) {
    const meetingsList : HTMLElement = document.querySelector(".meet-cont") as HTMLElement;

    let meetingsListStr = "";
    meetings.forEach(function (meeting) {
      const meetingAttendees = meeting.attendees.map(function (attendee) {
        return attendee.email;
      });

      const duration =
        parseInt(`${meeting.endTime.hours}`) * 60 +
        parseInt(`${meeting.endTime.minutes}`) -
        (parseInt(`${meeting.startTime.hours}`) * 60 +
          parseInt(`${meeting.startTime.minutes}`)) +
        (parseInt(`${meeting.endTime.hours}`) -
          parseInt(`${meeting.startTime.hours}`)) *
          10;
      const topHeight =
        parseInt(`${meeting.startTime.hours}`) * 60 +
        parseInt(`${meeting.startTime.minutes}`) +
        parseInt(`${meeting.startTime.hours}`) * 10;

      meetingsListStr += `
      <div>
        <div style="position:absolute;
             top:${topHeight}px;
             overflow:hidden;
             word-break:break-all;
             border:1px solid black;
             height:${duration}px;
             width:90%;
             background-color: rgb(248, 249, 250);
             padding-left:5px;
             color:black;
             z-index:3;margin-left:10px">
          <div>${meeting.name}</div>    
          <div>${meetingAttendees}</div>    
        </div>
      </div>
       `;
    });
    meetingsList.innerHTML = meetingsListStr;
  }
    
   GetMeetings (fetchDate : string  ) {
    Meetings(fetchDate  )
      .then(function (meetings : Meeting[]) {
        return meetings;
      })
      .then((meetings) => {
        this.getMeets(meetings  );
      });
  }

 load = () => {
  init();
    const today = new Date();

    let date =
      today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
      
    const day = today.getDay();

    const user : HTMLElement = document.getElementById("user") as HTMLElement;
    user.textContent = ` ${localStorage.getItem("email")}`;

    const todaysDate : HTMLInputElement = document.getElementById("date-now") as HTMLInputElement;
    const todaysDay = document.getElementById("day-now");
   

    todaysDate.textContent = `${today.getDate()} ${
      month[today.getMonth()]
    } ${today.getFullYear()}`;

    this.GetMeetings(date);

const selectDate : HTMLInputElement = document.getElementById("date-selected") as HTMLInputElement;
    selectDate.addEventListener("input",  () => {
     const searchDate  = selectDate.value;
      date = selectDate.value;
      const monthIndex = parseInt(date[6] + date[7]) - 1;
      todaysDate.textContent = `${date[8]}${date[9]} ${month[monthIndex]} ${date[0]}${date[1]}${date[2]}${date[3]}`;
      this.GetMeetings(searchDate);
    });
  };
}

let today;
let date;
const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export{Calender}