(function () {
  let filter;
  let period;
  let searchEl;
  let allUsers = [];
  // let fetchMeeting1;
  let searchMeetingListStr = "";
  let searchMeeting;
  let allUsersOptionsStr = "";

  function showMeetings(meetings) {
    // getAllUsers()
    searchMeetingListStr = "";
    allUsers.forEach(function (user) {
      allUsersOptionsStr += `<option  value="${user._id}">${user.email}</option> `;
    });

    meetings.forEach(function (meetings) {
      let year =
        meetings.date[0] +
        meetings.date[1] +
        meetings.date[2] +
        meetings.date[3];
      let day = meetings.date[8] + meetings.date[9];
      let month = meetings.date[5] + meetings.date[6];

      let starthours = meetings.startTime.hours;
      let startminute = meetings.startTime.minutes;
      let endhours = meetings.endTime.hours;
      let endminute = meetings.endTime.minutes;

      let attendeesStr = "";

      const meetingAttendees = meetings.attendees.map(function (attendees) {
        return attendees.email;
      });

      meetingAttendees.forEach(function (attendees) {
        attendeesStr += `<div>${attendees}</div>`;
      });

      let attendeesArray = attendeesStr.split(',');

      



      searchMeetingListStr += `<div class="boxes" meetid=${meetings._id}> 
     <div class="p-2"><span>${day}-${month}-${year}</span> <span>${starthours}:${startminute}-${endhours}:${endminute}</span></div>
     <div class="p-2">${meetings.name}</div>
     <div class="p-2"><button class="red-btn" type="button">Excuse Yourself</button></div>
     <hr class="hr-2"/>

     <h4 class="p-2">Attendes</h4>
     <div class="p-2"><a href="#">
      ${attendeesStr}
     </a></div>

     <div class="p-2">
         <form class="form-adduser" id="add-users" method="PATCH">
              <select class="w-70 drop-user" id="add-attendes" name="add-attendes">  
              ${allUsersOptionsStr}
              </select>
              <label for="add-attendes"> </label>
              <button class="add-attendes" type="submit">
                  Add
              </button>
         </form>
     </div>
  </div>`;
    });
   // document.getElementById('add-attendes').innerHTML = allUsersOptionsStr

    searchMeeting.innerHTML = searchMeetingListStr;
    deleteMeetingItem();
    addemail();

    function addemail() {
      const formEl = document.querySelectorAll(".form-adduser");
      formEl.forEach(function (form) {
        const chooseMember = form.querySelector(".drop-user");
        form.addEventListener("submit", function (event) {
          event.preventDefault();
          const userId = chooseMember.value;
          const team = form.closest(".boxes");
          const searchId = team.getAttribute("meetid");
          if (true) {
            addUser(searchId, userId)
              .then(function (attendeesResponse) {
                console.log(attendeesResponse);
               
                alert("user added");
                fetchMeetings("All" , "")

              })
              .catch(function (error) {
                alert(error.message);
              });
          }
        });
      });
    }
  }

  

  function fetchMeetings(period, searchEl) {
    getFilterMeeting(period, searchEl)
      .then(function (response) {
        console.log(response);
        return response;
      })
      .then(showMeetings)

      .catch(function (error) {
        console.log(error.message);
      });
  }

  function addEventListenersFilter() {
    filter.addEventListener("submit", function (event) {
      period = document.getElementById("date-dropdown").value;
      searchEl = document.getElementById("search-area").value;
      event.preventDefault();

      searchMeetingListStr = "";

      console.log(period);
      console.log(searchEl);

      fetchMeetings(period, searchEl);
    });
  }

  function deleteMeetingItem() {
    const btn = document.querySelectorAll(".red-btn");
    btn.forEach(function (btn) {
      btn.addEventListener("click", function (event) {
        const meet = btn.closest(".boxes");
        const meetingId = meet.getAttribute("meetid");
        deleteMeetings(meetingId)
          .then(function (response) {
            meet.remove();
            console.log(response);
          })
          .catch(function (error) {
            console.log(error.message);
          });
      });
    });
  }

  window.addEventListener("load", function () {
    filter = document.getElementById("filter-form");
    searchMeeting = document.getElementById("meeting-list");
    getAllUsers();
    fetchMeetings("all", "");
    addEventListenersFilter();

    function getAllUsers() {
      return getUsers()
        .then(function (response) {
          //console.log(response);
          return response;
        })
        .then(function (users) {
          allUsers = users;
        });
    }

  });
})();
