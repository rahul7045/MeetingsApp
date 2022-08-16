(function(){

    function fetchTeams(){
        getTeams()
        .then(function(response){
            return response;
            //console.log(response);
        })
        .then(function(response){
           console.log(response);
  
        })
        .catch(function(error){
            console.log(error.message);
        })
    }



    window.addEventListener('load' , function(){
        fetchTeams();
    })
})()