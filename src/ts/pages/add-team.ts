import  ITeam  from '../models/Team';
import {getUserID} from '../services/get-id';
import  {getTeams , addTeamServices , excuseYourself , addMember} from '../services/teams'



let membersArray: string[] = [];
function appendMembers(member : string) {
  membersArray.push(member);
  const memberNode = document.createTextNode(`,${member}`);
  (document.querySelector(".rehan") as HTMLElement).appendChild(memberNode);
}

class addTeam {
   addTeamsList = document.querySelector(".members") as HTMLElement;
   allUsers: any[] = [];
   showUsersDropdown =() => {
    let allUsersOptionsStr = "";
    let addTeamsListStr = "";
    this.allUsers.forEach(function (user) {
      allUsersOptionsStr += `<option value="${user.email}">${user.email}</option> `;
    });

    addTeamsListStr += `<div class="rehan"><span style="font-weight:bold">Members:</span></div>
      <div>
        <span>
          <label for="member"></label>
          <select style="width:40%" class= "select-input" id="member"> <option style="color:#999;">Select member</option>${allUsersOptionsStr}</select>
        </span>
        <button type="button" 
                class="add-btn" 
                onclick="appendMembers(this.closest('div').querySelector('.select-input').value)">Add
        </button>
      </div>
      `;

    this.addTeamsList.innerHTML = addTeamsListStr;
    return allUsersOptionsStr;
  }

   getAllUsers =()=> {
    return getUserID()
      .then(function (response) {
        console.log(response);
        return response;
      })
      .then( (users) =>{
        this.allUsers = users;
      });
  }
  
 addNewTeam(user : string) {
  
  const addTeamForm = document.querySelector("#add-team") as HTMLElement;
  // var users; //;
  addTeamForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let selectInput = document.getElementById("add-member") as HTMLElement;
    console.log(selectInput.innerHTML);

    let team = {
      name: (document.getElementById("team-name") as HTMLInputElement).value.trim(),
      shortName: (document.getElementById("team-short-name") as HTMLInputElement).value.trim(),
      description: (document.getElementById("team-description") as HTMLInputElement).value.trim(),
      members: membersArray,
    };
    if (true) {
       addTeamServices(team )
      .then( (addedTeam) => {
        console.log(addedTeam._id);

        let newTeamMembers = addedTeam.members.map(function (newMember: { email:string; }) {
          return newMember.email;
        });

        // let newAllMembersOption = "";
        // allUsers.forEach(function (user) {
        //   newAllMembersOption += `<option value="${user.email}">${user.email}</option> `;
        // });

        let addedNewTeam = `
      
            <div class="team-name">${addedTeam.name}</div>
            <div class="team-short-name">@${addedTeam.shortName}</div>
            <div>${addedTeam.description}</div>
            <div> 
              <button type="submit" 
                      onclick="excuseYourself('${addedTeam._id}',this.closest('.card'))" 
                      class="excuse-yourself-btn"
                  >Excuse yourself
              </button>
            </div>
            <div class="rehan"><span style="font-weight:bold">Members:</span>${newTeamMembers}</div>
            <div>
              <span>
                <label for="add-member"></label>
                <select style="width:40%" id="add-member" class= "select-input">${selectInput.innerHTML}</select>
              </span>
              <button type="submit" 
                      class="add-btn" 
                      onclick=" addMember('${addedTeam._id}',this.closest('.card').querySelector('.select-input').value,this.closest('div').previousElementSibling
                      )"
                  >Add
              </button>
            </div>
          </div>
       
        `;

        const parentNode = document.querySelector(".card-collection") as HTMLElement;
        const childNode = document.createElement("div");
        childNode.innerHTML = addedNewTeam;
        parentNode.insertBefore(childNode, document.getElementById("add-team"));
        childNode.classList.add("card");
        (document.getElementById("add-team") as HTMLElement).classList.add("hide");
      });
    }
  });
}

  load =() =>{
    let allUsersOptionsStr = "";
    this.getAllUsers().then( () => {
      this.showUsersDropdown();
    });
    this.allUsers.forEach(function (user) {
      allUsersOptionsStr += `<option value="${user.email}">${user.email}</option> `;
    });
    this.addNewTeam(allUsersOptionsStr);
  };


};




//console.log(membersArray);
export {addTeam}



//no use
