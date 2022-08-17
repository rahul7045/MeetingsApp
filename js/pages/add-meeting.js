(function(){
    let addMeeting1;

    function addEventListenersaddMeeting(){
        addMeeting1.addEventListener('submit' , function(event){
            event.preventDefault();


            const nameEl = document.getElementById( 'name' );
            const descriptionEl = document.getElementById( 'description' );

            const dateEl = document.getElementById( 'date' );
            const starttimeEl = document.getElementById( 'start-time' ).value;
            const endtimeEl = document.getElementById( 'end-time' ).value;
            const attendeesEl = document.getElementById('emails');

            let attendeesarrayEl = attendeesEl.value.split(',')
            //console.log(starttimeEl[0]+starttimeEl[1]);
            //console.log(endtimeEl);
           // console.log(attendeesarrayEl);

           let data = {
            name : nameEl.value.trim(),
            description: descriptionEl.value.trim(),
            date: dateEl.value.trim(),
            startTime: {
                hours : starttimeEl[0]+starttimeEl[1] ,
                minutes : starttimeEl[3]+starttimeEl[4]
            },
            endTime: {
                hours : endtimeEl[0]+endtimeEl[1],
                minutes : endtimeEl[3]+endtimeEl[4]
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