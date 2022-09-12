(function () {
  let dateEl;
  let dateDisplay;
  dateEl = document.getElementById("selectedDate");
  dateDisplay = document.getElementById("date-display");
  let allcalender = [];
  //  let string = '';

  function deletedisplayInformation(){
    let span = document.querySelectorAll(".day");
    for(let i=0;i< span.length;i++){
      let string = "";
      const meetingDay = span[i].closest(".box");
      const meeting = meetingDay.querySelector(".meeting");
      meeting.innerHTML = string;

    }

  }

  function displayCalender(calender) {
    deletedisplayInformation()
    let span = document.querySelectorAll(".day");

    calender.forEach(function (calender) {
      let attendeesEmail = calender.attendees
        .map(function (attendee) {
          return attendee.email;
        })
        .join(",");

      for (let i = 0; i < span.length; i++) {
        let string = "";

        if (parseInt(span[i].textContent) === calender.startTime.hours) {
          const meetingDay = span[i].closest(".box");
          const meeting = meetingDay.querySelector(".meeting");
          string = `
                    <div class="">
                        <div class=""><strong>${calender.name}</strong></div>
                        <hr />
                        <div class="">${attendeesEmail}</div>
                    </div>`;
          meeting.innerHTML = string;
          //dateDisplay.innerHTML = formattedDate;
        }
      }
    });
  }

  // fetch meeting

  function fetchMeetings(formattedDate) {
    getMeetings(formattedDate)
      .then(function (response) {
        //console.log(` ${response[0].name} - ${response[0].date}-${response[0].description}`);

        allcalender = response;
        displayCalender(response);
      })
      .catch(function (error) {
        alert.log(error.message);
      });
  }

  // date input event

  dateEl.addEventListener("input", function (event) {
    let pickDate = dateEl.value;
    dateDisplay.innerHTML = `${pickDate}`;
    
    // console.log(formattedDate);
    fetchMeetings(pickDate);
  });

  // window load event

  window.addEventListener("load", function () {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;
    //console.log(formattedDate)
    dateDisplay.innerHTML = formattedDate;
    fetchMeetings(formattedDate);
    // addEventListeners();
  });
})();
