



function isValidate(){
  return true;
}

  function addEventListeneraddTeam() {
    const form = document.getElementById("add-team");
    const teamName = document.getElementById("team-name");
    const teamShortName = document.getElementById("team-short-name");
    const teamDescription = document.getElementById("team-description");
    const teamMail = document.getElementById("email-dropdown");

    form.addEventListener("submit", function (event) {
      event.preventDefault();

     //console.log(teamName.value)

      const data = {
        name: teamName.value,
        shortName: teamShortName.value,
        description: teamDescription.value,
        members: teamMail.value,
      };

      console.log(data)

      addTeams(data)
        .then(function (team) {
          console.log(data);
          window.location.href = '../teams.html';

        })
        .catch(function (error) {
          console.log(error.message);
        });
    });
  }





window.addEventListener( 'load', function() {

  addEventListeneraddTeam();
});

