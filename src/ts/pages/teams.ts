(function () {
  let allUsers = [];
  //////////
 // let addTeamsItems;
  const dropdownEmail = document.getElementById("email-dropdown");
  const teamDisplay = document.querySelector('.parent-team');
  let card = teamDisplay.innerHTML;


  function showTeams(teams) {
    //let searchTeam = document.getElementById("team-list");

    let card = teamDisplay.innerHTML;

    let allUsersOptionsStr = "";
    let searchteamstrList = "";

    allUsers.forEach(function (user) {
      allUsersOptionsStr += `<option  value="${user._id}">${user.email}</option> `;
    });

    //searchTeam.innerHTML = "";
    teamDisplay.innerHTML = "";
    searchteamstrList = "";
    teams.forEach(function (teams) {
      let teamMembers = teams.members.map(function (member) {
        return member.email;
      });

      let memberStr = "";
      teamMembers.forEach(function (member) {
        memberStr += `<div>${member}</div>`;
      });
      searchteamstrList += `<div class="team-list" teamid = "${teams._id}"> 
      <div class="p-2"><span> ${teams.name} </span> <span> check </span></div>
      <div class="p-2"> ${teams.shortName} </div>
      <div class="p-2"> ${teams.description} </div>

      <div class="p-2"><button class="red-btn" type="button">Excuse Yourself</button></div>
      <hr class="hr-2"/>
 
      <h4 class="p-2">Attendes</h4>
      <div class="p-2"><a href="#">
       ${memberStr}
      </a></div>
      
      <div class="p-2 ">
      <form class="form-adduser" id="add-users" method="post">
          <select class="w-70 drop-user" id="add-attendes" name="add-attendes"">
          ${allUsersOptionsStr}

          </select>
          <label for="add-attendes"></label>
          <button class="add-attendes" type="submit">Add</button>
      </div>
     </form>
 
   </div>`;
    });

    teamDisplay.innerHTML += searchteamstrList + card;
    addEventListeneraddTeam()
    deleteTeamItem();
    showdropdown();

    addemail();


   // dropdownEmail.innerHTML = allUsersOptionsStr;

    function addemail() {
      const formEl = document.querySelectorAll(".form-adduser");
      formEl.forEach(function (form) {
        const chooseMember = form.querySelector(".drop-user");
        form.addEventListener("submit", function (event) {
          event.preventDefault();
          const userId = chooseMember.value;
          const team = form.closest(".team-list");
          const searchId = team.getAttribute("teamid");
          if (true) {
            addUserTeam(searchId, userId)
              .then(function (attendeesResponse) {
                console.log(attendeesResponse);

                //document.getElementById('add-attendes').innerHTML = allUsersOptionsStr
                alert("user added");
                fetchTeams();
              })
              .catch(function (error) {
                alert(error.message);
              });
          }
        });
      });
    }
  }

  // function addEventListeneraddTeam() {
  //   addTeamsItems.addEventListener("submit", function (event) {
  //     event.preventDefault();

  //     const teamName = document.getElementById("team-name").value;
  //     const teamShortName = document.getElementById("team-short-name").value;
  //     const teamDescription = document.getElementById("team-description").value;
  //     const teamMail = document.getElementById("email-dropdown").value;

  //     const data = {
  //       name: teamName,
  //       shortName: teamShortName,
  //       description: teamDescription,
  //       members: teamMail,
  //     };

  //     addTeams(data)
  //       .then(function (team) {
  //         console.log(data);
  //         fetchTeams();
  //       })
  //       .catch(function (error) {
  //         console.log(error.message);
  //       });
  //   });
  // }

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
        const team = btn.closest(".team-list");
        const teamId = team.getAttribute("teamid");
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

  function showdropdown() {
    let dropdownallemail="";
    let dropdownStr = "";
    allUsers.forEach(function (user) {
      dropdownallemail += `<option  value="${user._id}">${user.email}</option> `;
    });
   dropdownStr += dropdownallemail
    //console.log(allUsersOptionsStr)
    //let dropdownEmail = document.getElementById('membersemail')
     dropdownEmail.innerHTML = dropdownStr ;
     
  }

  window.addEventListener("load", function () {
    //addTeamsItems = document.getElementById("add-team");
    getAllUsers()
    .then(
      function(){
        showdropdown();
      }
    );
    fetchTeams();

    addEventListeneraddTeam();
    //showdropdown();

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
