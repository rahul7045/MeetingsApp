(function(){
    let addMeeting1;

    function addEventListenersaddMeeting(){
        addMeeting1.addEventListener('submit' , function(event){
            event.preventDefault();


            const nameEl = document.getElementById( 'name' );
            const descriptionEl = document.getElementById( 'description' );

            const dateEl = document.getElementById( 'date' );
            const starttimeEl = document.getElementById( 'start-time' );
            const endtimeEl = document.getElementById( 'end-time' );
            const attendeesEl = document.getElementById('emails');

            let attendeesarrayEl = attendeesEl.value.split(',')
           // console.log(attendeesarrayEl);

           let data = {
            name : nameEl.value.trim(),
            description: descriptionEl.value.trim(),
            date: dateEl.value.trim(),
            startTime: {
                hours : 10 ,
                minutes : 11
            },
            endTime: {
                hours : 11,
                minutes : 11
            },
            attendees : attendeesarrayEl,
        };

        console.log(data)

        addMeeting(data)
         .then(
            function(meeting){
                console.log(meeting);
                console.log("data added");
            }
         )
         .catch(
            function(error){
                console.log(error.message);
            }
         )


        })
    }

    window.addEventListener('load'  , function(){

        addMeeting1 = document.getElementById('add-meeting');


        addEventListenersaddMeeting()
    })

})();