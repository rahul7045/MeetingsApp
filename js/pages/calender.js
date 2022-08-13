(function(){
    let dateEl;


    // fetch meeting 

  function fetchMeetings(formattedDate){
    getMeetings(formattedDate)
    .then(function(response){
        console.log(` ${response[0].name} - ${response[0].date}-${response[0].description}`);
    })
    .catch(function(error){
        console.log(error.message);
    });
   }


   // date input event

   function addEventListeners(){
     dateEl.addEventListener('input' , function(){

         let formattedDate = dateEl.value;  
              
        console.log(formattedDate);
        fetchMeetings(formattedDate);
     });   
 }




// window load event

    window.addEventListener('load' , function(){
        dateEl = document.getElementById('selectedDate');

        const today = new Date();
        const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
        //console.log(formattedDate)
        fetchMeetings(formattedDate);
        addEventListeners();
    });

})();