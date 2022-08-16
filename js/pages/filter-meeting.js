(function(){
    let filter;
    let period ;
    let searchEl ;
   // let fetchMeeting1;

    function fetchMeetings(period , searchEl){
        getFilterMeeting(period , searchEl)
        .then(
            function(response ){
                console.log(response)
            }
        )
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


    window.addEventListener('load' , function(){
       filter = document.getElementById('filter-form') ;
      // period = 'all';
      // searchEl = "rahul";

      // fetchMeeting1 = document.getElementById('filter-form');

      // fetchMeetings("all" , "");

       addEventListenersFilter();


    })
})()