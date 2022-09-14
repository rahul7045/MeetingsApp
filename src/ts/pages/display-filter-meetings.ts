import  {addMeeting , getMeetings , filterMeetings , excuseYourself , addAttendee} from '../services/get-meetings'
import {Meeting} from '../models/Meetings';
import {getUserID} from '../services/get-id'
import {AllUser} from '../models/AllUser';
import '../../scss/pages/tab.scss';
import addMeetingValidation from '../services/add-meeting-validation';
import Users from '../models/Users'
let membersArray: Users[] = [];
import opentab from './tab';
//import  from '../services/teams'
 


function appendMembers(member: Users) {
  membersArray.push(member);
  const memberNode = document.createTextNode(`,${member}`);
  (document.querySelector(".member-list") as HTMLDivElement).append(memberNode);
}


class displayFilter {
   allUsers:  Users[] =[];

   searchMeetingForm : HTMLFormElement | null = null;


   showMeetings = (meetings : Meeting[] )  =>{
    const searchMeetingList : HTMLElement = document.querySelector(".meeting-card-container") as HTMLElement;
    let allUsersOptionsStr = "";
    this.allUsers.forEach(function (user) {
      allUsersOptionsStr += `<option value="${user.email}">${user.email}</option> `;
    });

    let searchMeetingListStr = "";
    meetings.forEach(function (meeting , idx) {
      let meetingAttendees = meeting.attendees.map(function (attendee) {
        return attendee.email;
      });

      let year =
        meeting.date[0] + meeting.date[1] + meeting.date[2] + meeting.date[3];
      let day = meeting.date[8] + meeting.date[9];
      let month   = meeting.date[5] + meeting.date[6];

      if (month == "01") {
        month = `January`;
      } else if (month == "02") {
        month = `February`;
      } else if (month == "03") {
        month = `March`;
      } else if (month == "04") {
        month = `April`;
      } else if (month == "05") {
        month = `May`;
      } else if (month == "06") {
        month = `June`;
      } else if (month == "07") {
        month = `July`;
      } else if (month == "08") {
        month = `August`;
      } else if (month == "09") {
        month = `September`;
      } else if (month == "10") {
        month = `October`;
      } else if (month == "11") {
        month = `November`;
      } else if (month == "12") {
        month = `December`;
      }

      let meetingID = meeting._id;
      searchMeetingListStr += `
        <div class="card">
          <div>
            <span class="date">${day} ${month} ${year}</span>
            <span class="duration">
              ${meeting.startTime.hours}:${meeting.startTime.minutes} - ${meeting.endTime.hours}:${meeting.endTime.minutes}
            </span>
          </div>
          <div class="meeting-name">${meeting.name}</div>
          <div>
            <button type="submit" 
            id = "${idx}"
             class="excuse-yourself-btn">
             Excuse yourself
             </button>
          </div>
          <div><span style="font-weight:bold">Attendees:</span><span style="word-break: break-all;">${meetingAttendees}</span></div>
          <div>
            <span>
              <label for="add-attendee"></label>
              <select style="width:40%" id="add-attendee" class="select-input"> 
              <option style="color:#999;">Select member</option>${allUsersOptionsStr}</select>
            </span>
            <button type="button" 
                          class="add-btn" 
                          
                          )"
                      >Add
                  </button>
          </div>
        </div>
         `;
    });
    searchMeetingList.innerHTML = searchMeetingListStr;

    meetings.forEach(function(meeting , idx){
      const excuseYourselfBtn =
        document.querySelectorAll(`.excuse-yourself-btn`);
      (excuseYourselfBtn[idx] as HTMLButtonElement).addEventListener(
        "click",
        () => {
          let meetid :string = meeting._id!; 
          excuseYourself(meetid).then(function () {
            (
              (excuseYourselfBtn[idx] as HTMLButtonElement).closest(
                ".card"
              ) as HTMLDivElement
            ).remove();
          });
        }
      );

      const addMemberBtn = document.querySelectorAll(".add-btn");
      const selectInput = document.querySelectorAll(".select-input");
      const memberList = (
        (selectInput[idx] as HTMLInputElement).closest("div") as HTMLDivElement
      ).previousElementSibling;
      let userID:  string;

      (selectInput[idx] as HTMLInputElement).addEventListener(
        "input",
        function () {
          userID = (selectInput[idx] as HTMLInputElement).value;

        }
      );

      (addMemberBtn[idx] as HTMLButtonElement).addEventListener("click", () => {
        let meet1 : string = meeting._id!

        addAttendee(meet1, userID).then(function () {
          const memberNode = document.createTextNode(`,${userID}`);
          (memberList as HTMLElement).appendChild(memberNode);
        });
      });


    })
  }

   showSearchMeetings =() => {
    this.searchMeetingForm  = document.getElementById("search-meeting-form") as HTMLFormElement;
    (this.searchMeetingForm as HTMLElement).addEventListener("submit",  (event) => {
      let periodField = (document.getElementById("period") as HTMLInputElement).value;
      let searchEl = (document.getElementById("search") as HTMLInputElement).value;
      event.preventDefault();
      const selectInput  = document.querySelector(".select-input") as HTMLElement;

      filterMeetings(periodField, searchEl)
        .then( (meetings) => {
        this.showMeetings(meetings);
        })
        .catch(function (error) {
          alert(error.message);
        });
    });
  }

   getAllUsers =() => {
    return getUserID()
      .then(function (response) {
        console.log(response);
        return response;
      })
      .then( (users) => {
        this.allUsers = users;
        console.log(this.allUsers)
      });
    
  }

  load = () =>{
    this.getAllUsers()
    .then(()=>{
      this.showSearchMeetings();
      const e = new addMeetingValidation();
       e.load()
    }
    )

    
   
  };

};

export {displayFilter}