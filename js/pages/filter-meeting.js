(function(){
    let filter;
    let period ;
    let searchEl ;
   // let fetchMeeting1;
   let searchMeetingListStr= ""
   let searchMeeting ;


   function showMeetings(meetings){



    //  meetings.forEach(function(meetings){
    //     let meetingAttendees = meetings.attendees.map(function(attendees){
    //          return attendees.email;
    //      })
    //   })

    meetings.forEach(function(meetings){

            let year = meetings.date[0] + meetings.date[1] + meetings.date[2] + meetings.date[3];
            let day = meetings.date[8] + meetings.date[9];
            let month = meetings.date[5] + meetings.date[6];

            let starthours = meetings.startTime.hours;
            let startminute = meetings.startTime.minutes;
            let endhours = meetings.endTime.hours;
            let endminute = meetings.endTime.minutes;

            let attendeesStr= ""


            const meetingAttendees = meetings.attendees.map(function(attendees){
                return attendees.email;
            })


            meetingAttendees.forEach(function(attendees){
                attendeesStr += `<div>${attendees}</div>`
            });

            


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
         <select id="add-attendes" name="add-attendes">
             <option value="-">All</option>
             <option value="mum">Rahul</option>
             <option value="blr">Rehan</option>
             <option value="del">Chaitanya</option>
         </select>
         <label for="add-attendes"><button class="add-attendes" type="button">Add</button></label>
     </div>


  </div>`

    })



     

  searchMeeting.innerHTML = searchMeetingListStr;
  deleteMeetingItem()



}


    function fetchMeetings(period , searchEl){

        getFilterMeeting(period , searchEl)
        .then(
            function(response ){
                console.log(response)
                return response;
                
            }
        )
        .then( showMeetings)
        
        .catch( function(error){
            console.log(error.message)
        } )
    }

    

    function addEventListenersFilter(){
        filter.addEventListener('submit' , function(event){
          period = document.getElementById('date-dropdown').value;
          searchEl = document.getElementById('search-area').value;
          event.preventDefault();



          console.log(period);
          console.log(searchEl)

          fetchMeetings(period , searchEl)
        })

    }

    function deleteMeetingItem(){
        const btn = document.querySelectorAll('.red-btn');
        btn.forEach(function(btn){
            btn.addEventListener('click' , function(event){
                const meet = btn.closest('.boxes');
                const meetingId = meet.getAttribute('meetid');
                deleteTeams(meetingId)
                .then(
                    function(response){
                        meet.remove();
                        console.log(response)
                    }
                )
                .catch(
                    function(error){
                        console.log(error.message)
                    }
                )
            })
        })
    }


    window.addEventListener('load' , function(){
       filter = document.getElementById('filter-form') ;
       searchMeeting = document.getElementById('meeting-list');
      // period = 'all';
      // searchEl = "rahul";

      // fetchMeeting1 = document.getElementById('filter-form');

      // fetchMeetings("all" , "");

       addEventListenersFilter();


    })
})()