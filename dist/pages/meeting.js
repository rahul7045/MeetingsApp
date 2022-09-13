import { addMeeting } from '../services/get-meetings';
class Meeting {
    constructor() {
        //addMeetingForm : HTMLElement | null = null;
        this.addMeetingForm = document.getElementById("add-meeting-form");
        this.addEventListeners = () => {
            this.addMeetingForm.addEventListener("submit", function (event) {
                event.preventDefault();
                const start = (document.getElementById("start-time"));
                const end = (document.getElementById("end-time"));
                let meeting = {
                    name: document.getElementById("meeting-name").value.trim(),
                    description: document.getElementById("description").value.trim(),
                    date: document.getElementById("date").value,
                    startTime: {
                        hours: parseInt(start.value[0] + start.value[1]),
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
        };
        this.load = () => {
            let user = document.getElementById("user");
            user.textContent = ` ${localStorage.getItem("email")}`;
            this.addEventListeners();
        };
    }
}
export { Meeting };
//# sourceMappingURL=meeting.js.map