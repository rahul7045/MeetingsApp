import  {addMeeting , getMeetings , filterMeetings , excuseYourself , addAttendee} from '../services/get-meetings'
class Meeting {
    //addMeetingForm : HTMLElement | null = null;
   addMeetingForm : HTMLElement = document.getElementById("add-meeting-form") as HTMLElement;

   addEventListeners =() =>{
    this.addMeetingForm.addEventListener("submit", function (event) {
  
      event.preventDefault();

      const start  = (document.getElementById("start-time"))  as HTMLInputElement ;
      const end = (document.getElementById("end-time")) as HTMLInputElement;

      let meeting = {
        name: (document.getElementById("meeting-name") as HTMLInputElement).value.trim(),
        description: (document.getElementById("description") as HTMLInputElement).value.trim(),
        date: (document.getElementById("date") as HTMLInputElement).value,
        startTime: {
          hours: parseInt(start.value[0] + start.value[1]) ,
          minutes: parseInt(start.value[3] + start.value[4]),
        },
        endTime: {
          hours: parseInt(end.value[0] + end.value[1]),
          minutes: parseInt(end.value[3] + end.value[4]),
        },
        attendees: [
          "rehan.pathan@publicisgroupe.com",
        ],
      };

      addMeeting(meeting)
        .then(function (addMeetingResponse) {
          console.log(addMeetingResponse);
        })
        .catch(function (error) {
          alert(error.response);
        });
    });
  }

  load =() =>{
    let user : HTMLElement = document.getElementById("user") as HTMLElement;
    user.textContent = ` ${localStorage.getItem("email")}`;
    this.addEventListeners();
  }
}
