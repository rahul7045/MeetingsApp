import { Meetings } from "../services/get-calendar";
class Calender {
    constructor() {
        this.load = () => {
            var today = new Date();
            var date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
            var day = today.getDay();
            let user = document.getElementById("user");
            user.textContent = ` ${localStorage.getItem("email")}`;
            let todaysDate = document.getElementById("date-now");
            let todaysDay = document.getElementById("day-now");
            todaysDate.textContent = `${today.getDate()} ${month[today.getMonth()]} ${today.getFullYear()}`;
            this.GetMeetings(date);
            let selectDate = document.getElementById("date-selected");
            selectDate.addEventListener("input", () => {
                let searchDate = selectDate.value;
                date = selectDate.value;
                let monthIndex = parseInt(date[6] + date[7]) - 1;
                todaysDate.textContent = `${date[8]}${date[9]} ${month[monthIndex]} ${date[0]}${date[1]}${date[2]}${date[3]}`;
                this.GetMeetings(searchDate);
            });
        };
    }
    getMeets(meetings) {
        const meetingsList = document.querySelector(".meet-cont");
        let meetingsListStr = "";
        meetings.forEach(function (meeting) {
            let meetingAttendees = meeting.attendees.map(function (attendee) {
                return attendee.email;
            });
            let duration = parseInt(`${meeting.endTime.hours}`) * 60 +
                parseInt(`${meeting.endTime.minutes}`) -
                (parseInt(`${meeting.startTime.hours}`) * 60 +
                    parseInt(`${meeting.startTime.minutes}`)) +
                (parseInt(`${meeting.endTime.hours}`) -
                    parseInt(`${meeting.startTime.hours}`)) *
                    10;
            let topHeight = parseInt(`${meeting.startTime.hours}`) * 60 +
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
    GetMeetings(fetchDate) {
        Meetings(fetchDate)
            .then(function (meetings) {
            return meetings;
        })
            .then((meetings) => {
            this.getMeets(meetings);
        });
    }
}
;
var today;
var date;
let month = [
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
export { Calender };
//# sourceMappingURL=calendar.js.map