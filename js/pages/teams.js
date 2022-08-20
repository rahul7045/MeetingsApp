let addTeamsItems;
  let searchteamstrList;
  let alluser;
  let BtnAddMember;

(function () {
  let searchTeam;
  // let addTeams;
  

  window.addEventListener("load", function () {
    searchTeam = document.getElementById("team-list");
    addTeamsItems = document.getElementById("add-team");

    fetchTeams();
    fetchUsers();

    addEventListeneraddTeam();
  });
})();



function fetchUsers() {
  getAll()
    .then(function (response) {
      response.forEach(function (user) {
        alluser += `<option value= ${user._id} >${user.name}</option>`;
      });
    })
    .catch(function (error) {
      console.log(error.message);
    });
}

function addMember(){
  BtnAddMember = document.getElementById('add-member');
  BtnAddMember.addEventListener('click' , function(){
       let memberEmail = document.getElementById('add-attendes').value;
        
       

  })
}

function addEventListeneraddTeam() {
  addTeamsItems.addEventListener("submit", function (event) {
    event.preventDefault();

    const teamName = document.getElementById("team-name").value;
    const teamShortName = document.getElementById("team-short-name").value;
    const teamDescription = document.getElementById("team-description").value;
    const teamMail = document.getElementById("email-dropdown").value;

    const data = {
      name: teamName,
      shortName: teamShortName,
      description: teamDescription,
      members: teamMail,
    };

    addTeams(data)
      .then(function (team) {
        console.log(data);
        fetchTeams();
      })
      .catch(function (error) {
        console.log(error.message);
      });
  });

  //add user in the list
}

function showTeams(teams) {
  teams.forEach(function (teams) {
    let memberEmail = teams.members.map(function (member) {
        return member.email;
      })
      .join(",");
      console.log(alluser)

      fetchUsers()


    searchteamstrList += `<div class="boxes" teamid = "${teams._id}"> 
      <div class="p-2"><span> ${teams.name} </span> <span> check </span></div>
      <div class="p-2"> ${teams.shortName} </div>
      <div class="p-2"> ${teams.description} </div>

      <div class="p-2"><button class="red-btn" type="button">Excuse Yourself</button></div>
      <hr class="hr-2"/>
 
      <h4 class="p-2">Attendes</h4>
      <div class="p-2">${memberEmail}<a href="#">
       
      </a></div>
 
      <div class="p-2">
      <form method="patch" action="" id="add-attendees-form">
          <select  id="add-attendes" name="add-attendes">
              <option value="-">All</option> +
              ${alluser}+   
          </select>
          <label for="add-attendes"><button id="add-member" class="add-attendes" type="button">Add</button></label>
      </form>    
      </div>
 
 
   </div>`;
  });
  searchTeam.innerHTML = searchteamstrList;
  deleteTeamItem();
}

function fetchTeams() {
  getTeams()
    .then(function (response) {
      console.log(response);

      return response;
    })
    .then(showTeams)
    .catch(function (error) {
      console.log(error.message);
    });
}

function deleteTeamItem() {
  const btn = document.querySelectorAll(".red-btn");
  btn.forEach(function (btn) {
    btn.addEventListener("click", function (event) {
      const team = btn.closest(".boxes");
      const teamId = team.getAttribute("team-id");
      deleteTeams(teamId)
        .then(function (response) {
          team.remove();
          console.log(response);
        })
        .catch(function (error) {
          console.log(error.message);
        });
    });
  });
}
